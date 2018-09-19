const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
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


exports.generateThumbnail = functions.storage.object().onFinalize((object) => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image')) {
    console.log('This is not an image.', contentType);
    return null;
  }

  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith('thumb_')) {
    console.log('Already a Thumbnail.');
    return null;
  }

  // Download file from bucket.
  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
  };
  return bucket.file(filePath).download({
    destination: tempFilePath,
  }).then(() => {
    console.log('Image downloaded locally to', tempFilePath);
    // Generate a thumbnail using ImageMagick.
    return spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath]);
  }).then(() => {
    console.log('Thumbnail created at', tempFilePath);
    // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
    const thumbFileName = `thumb_${fileName}`;
    const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
    // Uploading the thumbnail.
    return bucket.upload(tempFilePath, {
      destination: thumbFilePath,
      metadata: metadata,
    });
    // Once the thumbnail has been uploaded delete the local file to free up disk space.
  }).then(() => fs.unlinkSync(tempFilePath));
});
