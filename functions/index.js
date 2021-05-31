const functions = require('firebase-functions')
const gcs = require('@google-cloud/storage')()
const sharp = require('sharp')
const path = require('path')
const os = require('os')
const fs = require('fs')
const algoliasearch = require('algoliasearch')
const admin = require('firebase-admin')
const utils = require('./utils/utils')
const rss = require('./utils/rss')
const dynamicTags = '<meta name="functions-dynamic-tags">'

admin.initializeApp(functions.config().firebase)

// Configuration
const ALGOLIA_ID = "KM5M04U5PS"
const ALGOLIA_ADMIN_KEY = "05d1cc503cf7ebc5e7d2433a15b77bf4"
const ALGOLIA_INDEX_NAME = 'posts'
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

exports.onPostCreated = functions.firestore.document('posts/{postId}').onCreate((snap, context) => {
  const post = snap.data()
  post.id = context.params.postId
  post.timestamp = { seconds: post.timestamp.seconds, nanoseconds: post.timestamp.nanoseconds}
  post.objectID = post.id
  const index = client.initIndex(ALGOLIA_INDEX_NAME)
  return index.saveObject(post)
})

exports.onPostUpdated = functions.firestore.document('posts/{postId}').onUpdate((change, context) => {
  const post = change.after.data()
  post.id = context.params.postId
  post.objectID = post.id
  post.timestamp = { seconds: post.timestamp.seconds, nanoseconds: post.timestamp.nanoseconds}
  const index = client.initIndex(ALGOLIA_INDEX_NAME)
  if (post.deleted) {
    return index.deleteObject(post.id)
  } else {
    return index.saveObject(post)
  }
})

exports.onUserUpdated = functions.firestore.document('users/{userId}').onUpdate((change, context) => {
  if (
    (change.before.data().name === change.after.data().name) &&
    (change.before.data().picture === change.after.data().picture)
  ) return

  const postRef = admin.firestore().collection('posts')
  const user = change.after.data()

  postRef.where("userId", "==", user.id)
  .get()
  .then(querySnapshot => {
    return querySnapshot.forEach(doc => {
      const curDoc = doc.data()
      // Is this a good idea?
      curDoc.author = user.name
      curDoc.avatar = user.picture
      postRef.doc(doc.id).set(curDoc)
    })
  }).catch(error => {
    console.error(error)
  })
})

exports.optimizeImages= functions.storage.object().onFinalize((object) => {
  const fileBucket = object.bucket // The Storage bucket that contains the file.
  const filePath = object.name // File path in the bucket.
  const contentType = object.contentType // File content type.
  const resourceState = object.resourceState // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
  const metageneration = object.metageneration // Number of times metadata has been generated. New objects have a value of 1.

  const OPTIMIZATION = [
    {prefix: 'sm', size: 200},
    {prefix: 'md', size: 500},
  ] // Resize target width in pixels

  // Get the file name.
  const fileName = path.basename(filePath)
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith('img_') ||
    !contentType.startsWith('image/') ||
    resourceState === 'not_exists') {
    return null
  }

  const bucket = gcs.bucket(fileBucket)
  const tempFilePath = path.join(os.tmpdir(), fileName)
  const optimize = (optimization) => {
    console.log('optimization', JSON.stringify(optimization))
    const newFileName = `img_${optimization.prefix}_${fileName}`
    const newFileTemp = path.join(os.tmpdir(), newFileName)
    const newFilePath = `imgs/${newFileName}`

    return sharp(tempFilePath)
    .resize(optimization.size)
    .toFile(newFileTemp)
    .then(info => {
      return bucket.upload(newFileTemp, { destination: newFilePath })
    }).catch(error => {
      console.log(error)
    })
  }

  return bucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => OPTIMIZATION.forEach(optimization => optimize(optimization)))
  .catch(error => console.error(error))
})

function feed(res) {
  rss.generateFeed(xml => {
    res.
      set("Content-Type", "text/xml; charset=utf8")
      .status(200)
      .send(xml)
  })
}

function posts(res, id) {
	let indexHTML = fs.readFileSync('./index.html').toString()
  admin.firestore().collection('posts').doc(id).get().then(snapshot => {
    const post = snapshot.data()
    if (post) {
      post.id = id
      indexHTML = indexHTML.replace(dynamicTags, utils.getTags(post))
    }
    return res.status(200).send(indexHTML)
  }).catch(error => {
    console.error(error)
  })
  return
}

function bypass(res) {
	let indexHTML = fs.readFileSync('./index.html').toString()
  indexHTML = indexHTML.replace(dynamicTags, utils.getDefaultTags(path[1]))
  return res.status(200).send(indexHTML)
}

exports.host = functions.https.onRequest((req, res) => {
	const path = req.path ? req.path.split('/') : req.path

  // Keep an eye on this setting causes error
	//res.set('Cache-Control', 'public, max-age=60, s-maxage=600')

  if (utils.isABot(utils.ua(req)) && path.length > 1 && path[1] === 'posts') {
    const id = path[2]
    return posts(res, id)
	} else if(path[1] === 'feed') {
    return feed(res)
  }

  return bypass(res)
})
