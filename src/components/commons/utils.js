import ellipsize from 'ellipsize'

const bucketBaseUrl = 'https://firebasestorage.googleapis.com/v0/b/locally-57510.appspot.com/o/imgs'

export const currentPath = (level = 1) =>  window.location.pathname.split('/')[level]

export const hasMedia = post => post.media && post.media.length > 0

export const hasPanorama = post => post.media && post.media.length > 1

export const capitalize = word => word ? word.replace(/\w/, c => c.toUpperCase()) : ''

export const openURL = (url, blank = false) => {
  const win = blank
    ? window.open(url, '_blank')
    : window.open(url, '_self')
  win.focus()
}

export const imageURL = (post, size) => {
  if (!post.media || post.media.length === 0) return null

  if (size === 'panorama') {
    return bucketBaseUrl + '%2F' + post.media[1].filename + '?alt=media'
  } else if (size) {
    return bucketBaseUrl + '%2Fimg_' + size + '_' + post.media[0].filename + '?alt=media'
  } else {
    return bucketBaseUrl + '%2F' + post.media[0].filename + '?alt=media'
  }
}

export const ellip = (str, len, c1 = ',', c2 = '') => {
  let result = ellipsize(str, len, { truncate: false })
  const pos = result.lastIndexOf(c1)
  return result.substring(0, pos) + c2 + result.substring(pos + 1)
}
