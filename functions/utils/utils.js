const constants = require('./constants')
// Duplicated :(
const bucketBaseUrl = 'https://firebasestorage.googleapis.com/v0/b/locally-57510.appspot.com/o/imgs'

// Duplicated code :(
const imageURL = (post, size) => {
  if (!post.media || post.media.length === 0) return null

  if (size === 'panorama') {
    return bucketBaseUrl + '%2F' + post.media[1].filename + '?alt=media'
  } else if (size) {
    return bucketBaseUrl + '%2Fimg_' + size + '_' + post.media[0].filename + '?alt=media'
  }

  return bucketBaseUrl + '%2F' + post.media[0].filename + '?alt=media'
}

exports.imageURL = imageURL

exports.getDefaultTags = (path = '') => {
  let tags = `<meta property="og:type" content="website">`
	tags += `<meta property="og:title" content="${constants.siteInfo.title}">`
	tags += `<meta property="og:description" content="${constants.siteInfo.description}">`
	tags += `<meta property="og:url" content="https://nearo.co/${path}">`
  tags += `<meta property="og:image" content="https://nearo.co/images/icons/android-icon-512x512.png">`
  tags += `<meta name="twitter:card" content="summary">`
  tags += `<meta name="description" content="${constants.siteInfo.description}">`
  tags += `<link rel="canonical" href="https://nearo.co/${path}">`
  tags += `<title>${constants.siteInfo.title}</title>`
	return tags
}

exports.getTags = post => {
	let tags = `<meta property="og:type" content="website">`
	tags += `<meta property="og:title" content="${post.title} near ${post.locText} | Nearo">`
	tags += `<meta property="og:description" content="${post.body}">`
	tags += `<meta property="og:url" content="https://nearo.co/posts/${post.id}">`
  tags += `<meta name="twitter:card" content="summary">`
  tags += `<meta name="description" content="${post.body}">`
  tags += `<link rel="canonical" href="https://nearo.co/posts/${post.id}">`
  if (post.media.length > 0) {
	   tags += `<meta property="og:image" content="${imageURL(post, 'md')}">`
  }
  tags += `<title>${post.title} near ${post.locText} | Nearo</title>`
	return tags
}

exports.ua = req => req.headers['user-agent']? req.headers['user-agent'].toLowerCase() : 'notabot'

exports.isABot = userAgent => userAgent.includes('googlebot') ||
  userAgent.includes('yahoou') ||
  userAgent.includes('slurp') ||
  userAgent.includes('bingbot') ||
  userAgent.includes('baiduspider') ||
  userAgent.includes('yandex') ||
  userAgent.includes('yeti') ||
  userAgent.includes('yodaobot') ||
  userAgent.includes('gigabot') ||
  userAgent.includes('ia_archiver') ||
  userAgent.includes('facebookexternalhit') ||
  userAgent.includes('twitterbot') ||
  userAgent.includes('developers.google.com')
