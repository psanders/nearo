import ellipsize from 'ellipsize'

export const openURL = (url, blank = false) => {
  const win = blank
    ? window.open(url, '_blank')
    : window.open(url, '_self')
  win.focus();
}

export const currentPath = (level = 1) =>  window.location.pathname.split('/')[level]

const bucketBaseUrl = 'https://firebasestorage.googleapis.com/v0/b/locally-57510.appspot.com/o/imgs'

export const imageURL = (post, size) => {
  const s = size === 'panorama' ? 1 : 0
  return size !== 'panorama'
    ? bucketBaseUrl + '%2Fimg_' + size + '_' + post.media[s].filename + '?alt=media'
    : bucketBaseUrl + '%2F' + post.media[s].filename + '?alt=media'
}

export const ellip = (str, len, c1 = ',', c2 = '') => {
  let result = ellipsize(str, len, { truncate: false })
  const pos = result.lastIndexOf(c1);
  return result.substring(0, pos) + c2 + result.substring(pos + 1)
}

export const hasMedia = (post) => post.media && post.media.length > 0

export const hasPanorama = (post) => post.media && post.media.length > 1

export const capitalize = (word) => word ? word.replace(/\w/, c => c.toUpperCase()) : ""
