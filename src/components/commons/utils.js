export const openURL = (url, blank = false) => {
  const win = blank
    ? window.open(url, '_blank')
    : window.open(url, '_self')
  win.focus();
}

const bucketBaseUrl = 'https://firebasestorage.googleapis.com/v0/b/locally-57510.appspot.com/o/imgs'

export const imageURL = (post, size = 'md') => {
  const filename = post.media[0].filename
  return bucketBaseUrl + '%2Fimg_' + size + '_' + filename + '?alt=media'
}
