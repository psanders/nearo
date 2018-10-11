const functions = require('firebase-functions')
const gcs = require('@google-cloud/storage')()
const sharp = require('sharp')
//const spawn = require('child-process-promise').spawn
const path = require('path')
const os = require('os')
const fs = require('fs')
const algoliasearch = require('algoliasearch')
const admin = require('firebase-admin')
const utils = require('./utils')

admin.initializeApp(functions.config().firebase)

// Configuration
const ALGOLIA_ID = "IVUNNPL7J8"
const ALGOLIA_ADMIN_KEY = "4aa8f3c9e739c7bd4f8e63f07dc84e09"
const ALGOLIA_SEARCH_KEY = "c7a59a9ddbe2354bf0d9a1cdfc7f5fe3"
const ALGOLIA_INDEX_NAME = 'posts'
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)
const fbAppId = '1637247183064443'

exports.onPostCreated = functions.firestore.document('posts/{postId}').onCreate((snap, context) => {
  const post = snap.data()
  post.id = context.params.postId
  post.objectID = post.id
  const index = client.initIndex(ALGOLIA_INDEX_NAME)
  return index.saveObject(post)
})

exports.onPostUpdated = functions.firestore.document('posts/{postId}').onUpdate((change, context) => {
  const post = change.after.data()
  post.id = context.params.postId
  post.objectID = post.id
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

exports.host = functions.https.onRequest((req, res) => {
	const userAgent = req.headers['user-agent'].toLowerCase()
	let indexHTML = fs.readFileSync('./index.html').toString()
	const path = req.path ? req.path.split('/') : req.path
	const ogPlaceholder = '<meta name="functions-insert-dynamic-og"/>'
	const metaPlaceholder = '<meta name="functions-insert-dynamic-meta"/>'

	const isBot = userAgent.includes('googlebot') ||
		userAgent.includes('yahoou') ||
		userAgent.includes('bingbot') ||
		userAgent.includes('baiduspider') ||
		userAgent.includes('yandex') ||
		userAgent.includes('yeti') ||
		userAgent.includes('yodaobot') ||
		userAgent.includes('gigabot') ||
		userAgent.includes('ia_archiver') ||
		userAgent.includes('facebookexternalhit') ||
		userAgent.includes('twitterbot') ||
		userAgent.includes('developers.google.com') ? true : false

	if (isBot && (path && path.length > 1 && path[1] === 'posts')) {
		const id = path[2]
		admin.firestore().collection('posts').doc(id).get().then(snapshot => {
			const post = snapshot.data()
			if (post) {
				post.id = id
			}
			indexHTML = indexHTML.replace(metaPlaceholder, utils.getMeta(post))
			indexHTML = indexHTML.replace(ogPlaceholder, utils.getOpenGraph(post))
			res.status(200).send(indexHTML)
      return
		}).catch(error => {
      console.error(error)
    })
		return
	}

	//res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
	res.status(200).send(indexHTML)
})

/*
exports.generateThumbs = functions.storage
.object()
.onFinalize(async object => {
  const bucket = gcs.bucket(object.bucket)
  const filePath = object.name
  const fileName = filePath.split('/').pop()
  const bucketDir = path.dirname(filePath)
  //const bucketDir = 'imgs'

  const workingDir = path.join(os.tmpdir(), 'thumbs')
  const tmpFilePath = path.join(workingDir, fileName)

  if (fileName.includes('img_') || !object.contentType.includes('image')) {
    console.log('exiting function')
    return false
  }

  // 1. Ensure thumbnail dir exists
  await fs.ensureDir(workingDir)

  // 2. Download Source File
  await bucket.file(filePath).download({
    destination: tmpFilePath
  })

  // 3. Resize the images and define an array of upload promises
  const sizes = [64, 128, 256]

  const uploadPromises = sizes.map(async size => {
    const thumbName = `img_${size}_${fileName}`
    const thumbPath = path.join(workingDir, thumbName)

    // Resize source image
    await sharp(tmpFilePath)
      .resize(size, size)
      .toFile(thumbPath)

    // Upload to GCS
    return bucket.upload(thumbPath, {
      destination: path.join(bucketDir, thumbName)
    })
  })

  // 4. Run the upload operations
  await Promise.all(uploadPromises)

  // 5. Cleanup remove the tmp/thumbs from the filesystem
  return fs.remove(workingDir)
})
*/
