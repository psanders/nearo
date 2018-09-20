const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const sharp = require('sharp');
const path = require('path');
const os = require('os');
const fs = require('fs');
const algoliasearch = require('algoliasearch');

// Configuration
const ALGOLIA_ID = "IVUNNPL7J8";
const ALGOLIA_ADMIN_KEY = "4aa8f3c9e739c7bd4f8e63f07dc84e09";
const ALGOLIA_SEARCH_KEY = "c7a59a9ddbe2354bf0d9a1cdfc7f5fe3";
const ALGOLIA_INDEX_NAME = 'posts';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

exports.onPostCreated = functions.firestore.document('posts/{postId}').onCreate((snap, context) => {
  const post = snap.data();
  post.id = context.params.postId;
  post.objectID = post.id
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  return index.saveObject(post);
});

exports.onPostUpdated = functions.firestore.document('posts/{postId}').onUpdate((change, context) => {
  const post = change.after.data();
  post.id = context.params.postId;
  post.objectID = post.id
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  if (post.deleted) {
    index.deleteObject(post.id);
  } else {
    index.saveObject(post);
  }
});

exports.optimizeImages= functions.storage.object().onFinalize((object) => {

  console.log(object)

  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

  const OPTIMIZATION = [
    {prefix: 'sm', size: 200},
    {prefix: 'md', size: 500},
    {prefix: 'lg', size: 800},
  ]; // Resize target width in pixels

  if (!contentType.startsWith('image/') || resourceState === 'not_exists') {
    console.log('This is not an image.');
    return;
  }

  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith('img_')) {
    console.log('Already a Thumbnail.');
    return null;
  }

  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  return bucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => {
    return OPTIMIZATION.map(optimization => {
      let newFileName = `img_${optimization.prefix}_${fileName}`
      let newFileTemp = path.join(os.tmpdir(), newFileName);
      let newFilePath = `imgs/${newFileName}`

      return sharp(tempFilePath)
        .resize(optimization.size, null)
        .toFile(newFileTemp)
        .then(info => {
          return bucket.upload(newFileTemp, {
            destination: newFilePath
          })
        }).catch(error => {
          console.log(error)
        })
      ;
    })
  })
})
