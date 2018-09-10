import localforage from 'localforage';

export const storeUserInfo = (key, value) => {
  localforage.setItem(key, value)
  .then(() => {
    return localforage.getItem(key);
  }).catch(err => {
    console.error(err);
  });
}

export const fetchUserInfo = (key) => {
  return localforage.getItem(key);
}

export const removeUserInfo = (key) => {
  return localforage.removeItem(key);
}
