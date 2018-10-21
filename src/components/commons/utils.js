import ellipsize from 'ellipsize'

const bucketBaseUrl = 'https://firebasestorage.googleapis.com/v0/b/locally-57510.appspot.com/o/imgs'
const routes = ['/', '/explore', '/posts', '/profile', '/login', '/location', '/favorites']
const time = postedTime => new Date().getTime() / 1000 - postedTime

export const currentPath = (level = 1) =>  window.location.pathname.split('/')[level]

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getMainPath = str => {
  const regex = /^\/([^?/]+)/
  return str.match(regex) && str.match(regex).length > 1
    ? str.match(regex)[1]
    : null
}

export const show404 = pathname => getMainPath(pathname) !== 'posts' && !routes.includes(pathname)

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

  // This is a fix for issue #3. In the future it will be better to find a
  // better way to handle error while using CardMedia
  if (!post.timestamp) post.timestamp = { seconds: 0 }

  const justPosted = time(post.timestamp.seconds) < 120
    ? true
    : false

  if (size === 'panorama') {
    return bucketBaseUrl + '%2F' + post.media[1].filename + '?alt=media'
  } else if (size && !justPosted) {
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

export const scrollTop = () => {
  document.body.scrollTop = 0 // For Safari
  document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}
