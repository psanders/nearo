const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');
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
