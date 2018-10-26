
const bucketBaseUrl = 'https://firebasestorage.googleapis.com/v0/b/locally-57510.appspot.com/o/imgs'
const defaultPageTitle = 'Buy, sell, and trade locally | Nearo'
const defaultPageDescription = `Nearo is local classifieds for jobs, housing,
for sale, events, services, and community. Find cars, trucks, electronics, furniture, and more.`

const imageURL = (post, size) => size
  ? bucketBaseUrl + '%2Fimg_' + size + '_' + post.media[0].filename + '?alt=media'
  : bucketBaseUrl + '%2F' + post.media[0].filename + '?alt=media'

exports.getDefaultTags = path => {
  console.log('path', path)
  let tags = `<meta property="og:type" content="website" />`
	tags += `<meta property="og:title" content="${defaultPageTitle}" />`
	tags += `<meta property="og:description" content="${defaultPageDescription}" />`
	tags += `<meta property="og:url" content="https://nearo.co/${path}" />`
  tags += `<meta property="og:image" content="https://nearo.com/images/icons/android-icon-512x512.png" />`
  tags += `<meta name="twitter:card" content="summary"></meta>`
  tags += `<meta name="description" content="${defaultPageDescription}" />`
  tags += `<link rel="canonical" href="https://nearo.co/${path}" />`
  tags += `<title>${defaultPageTitle}</title>`
	return tags
}

exports.getTags = (post) => {
	let tags = `<meta property="og:type" content="website" />`
	tags += `<meta property="og:title" content="${post.title} near ${post.locText} | Nearo" />`
	tags += `<meta property="og:description" content="${post.body}" />`
	tags += `<meta property="og:url" content="https://nearo.co/posts/${post.id}" />`
  tags += `<meta name="twitter:card" content="summary"></meta>`
  tags += `<meta name="description" content="${post.body}" />`
  tags += `<link rel="canonical" href="https://nearo.co/posts/${post.id}" />`
  if (post.media.length > 0) {
	   tags += `<meta property="og:image" content="${imageURL(post, 'md')}" />`
  }
	return tags
}

exports.ua = req => req.headers['user-agent']? req.headers['user-agent'].toLowerCase() : 'notabot'

exports.isABot = userAgent => userAgent.includes('googlebot') ||
  userAgent.includes('mozilla') ||
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
