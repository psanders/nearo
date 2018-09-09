import localforage from 'localforage';

export const saveCurrentLocation = (location) => {
  localforage.setItem('current-location', location).then(function () {
    return localforage.getItem('current-location');
  }).then(function (value) {
    console.log("val", value);
  }).catch(function (err) {
    // we got an error
  });
}

export const getCurrentLocation = () => {
  return localforage.getItem('current-location');
}
