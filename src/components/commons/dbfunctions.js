import localforage from 'localforage';

export const storeUserInfo = (userInfo) => {
  localforage.setItem('user-info', userInfo)
  .then(() => {
    return localforage.getItem('user-info');
  }).catch(err => {
    console.error(err);
  });
}

export const fetchUserInfo = () => {
  return localforage.getItem('user-info');
}
