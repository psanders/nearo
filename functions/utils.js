
const bucketBaseUrl = 'https://firebasestorage.googleapis.com/v0/b/locally-57510.appspot.com/o/imgs'

const imageURL = (post, size) => {
  return size
    ? bucketBaseUrl + '%2Fimg_' + size + '_' + post.media[0].filename + '?alt=media'
    : bucketBaseUrl + '%2F' + post.media[0].filename + '?alt=media'
}

const capitalize = word => word ? word.replace(/\w/, c => c.toUpperCase()) : ''

const defaultPageTitle = 'For Sale, Cars, Furniture, Houses, Services, Community | Nearo'
const defaultPageDescription = 'Personal advertisement, Free Advertisement, DIY Advertisement'

const getTitle = (post) => post.title + " near " + post.locText

exports.getPageTitle = post => {
  if(post) {
    return `<title>${post.title? getTitle(post) : capitalize(post.category)}</title>`
  }
  return `<title>${defaultPageTitle}</title>`
}

exports.getPageDescription = post => {
  if(post) {
    return `<meta name="description" content="${post.body}" />`
  }
  return `<meta name="description" content="${defaultPageTitle}" />`
}

exports.getOpenGraph = (post, fbAppId) => {
	let og = `<meta property="fb:app_id" content="${fbAppId}" />`
	og += `<meta property="og:type" content="website" />`
	og += `<meta property="og:title" content="${post.title? getTitle(post) : capitalize(post.category)}" />`
	og += `<meta property="og:description" content="${post.body}" />`

  if (post.media.length > 0) {
	   og += `<meta property="og:image" content="${imageURL(post, 'md')}" />`
  }

	og += `<meta property="og:url" content="https://nearo.co/posts/${post.id}" />`
	return og
}

exports.getMeta = () => `<meta name="twitter:card" content="summary"></meta>`
