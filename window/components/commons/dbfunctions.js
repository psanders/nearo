import localforage from 'localforage'

export const storeUserInfo = (key, value, callback) => {
  localforage.setItem(key, value)
  .then(() => {
    if (callback) callback()
    return localforage.getItem(key)
  }).catch(err => {
    console.error('Code 0001', err)
  })
}

export const fetchUserInfo = key => localforage.getItem(key)

export const removeUserInfo = key => localforage.removeItem(key)
