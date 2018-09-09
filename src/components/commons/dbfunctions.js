import localforage from 'localforage';

export const saveBookmarks = (bookmarks) => {
  localforage.setItem('bookmarks', bookmarks).then(function () {
    return localforage.getItem('bookmarks');
  }).catch(function (err) {
    console.error(err);
  });
}

export const getBookmarks = () => {
  const bookmarks = localforage.getItem('bookmarks');
  return bookmarks? bookmarks : [];
}
