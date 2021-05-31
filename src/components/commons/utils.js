import ellipsize from 'ellipsize'

// WARNING: Hardcode value
const bucketBaseUrl = 'https://firebasestorage.googleapis.com/v0/b/nearo-52fe3.appspot.com/o/imgs'
const routes = ['/', '/amp','/about', '/explore', '/posts', '/profile', '/login', '/location', '/favorites']
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

export const hasPanorama = post => hasMedia(post) &&
  post.media.filter(m => m.filename.startsWith("img_360")).length > 0

export const capitalize = word => word ? word.replace(/\w/, c => c.toUpperCase()) : ''

export const openURL = (url, blank = false) => {
  const win = blank
    ? window.open(url, '_blank')
    : window.open(url, '_self')
  win.focus()
}

export const imageURL = (post, size, pos = 0) => {
  if (!post.media || post.media.length === 0) return null

  // This is a fix for issue #3. In the future it will be better to find a
  // better way to handle error while using CardMedia
  if (!post.timestamp) post.timestamp = { seconds: new Date().getTime() }

  const justPosted = time(post.timestamp.seconds) < 120
    ? true
    : false

  if (size === 'panorama') {
    return bucketBaseUrl + '%2F' + post.media[1].filename + '?alt=media'
  } else if (size && !justPosted) {
    return bucketBaseUrl + '%2Fimg_' + size + '_' + post.media[pos].filename + '?alt=media'
  }

  return bucketBaseUrl + '%2F' + post.media[pos].filename + '?alt=media'
}

export const postMedia = post => {
  if (!post.media || post.media.length === 0) return []

  const results = []

  post.media.forEach((media, i) => {
    const item = {
      original: imageURL(post, 'md', i)
    }
    results.push(item)
  })

  return results
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

const getUrlVars = () => {
  const vars = {}
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value
  })
  return vars
}

export const getUrlParam = (parameter, defaultvalue) => {
  let urlparameter = defaultvalue
  if(window.location.href.indexOf(parameter) > -1){
    urlparameter = getUrlVars()[parameter]
  }
  return urlparameter
}
