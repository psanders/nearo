import localforage from 'localforage';

export const saveCurrentLocation = (location) => {
  localforage.setItem('current-location', location).then(function () {
    return localforage.getItem('current-location');
  }).catch(function (err) {
    console.error(err);
  });
}

export const getCurrentLocation = () => {
  return localforage.getItem('current-location');
}
