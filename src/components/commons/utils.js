export const openURL = (url, blank = false) => {
  const win = blank
    ? window.open(url, '_blank')
    : window.open(url, '_self')
  win.focus();
}

const bucketBaseUrl = 'https://firebasestorage.googleapis.com/v0/b/locally-57510.appspot.com/o/imgs'

export const imageURL = (post, size) => {
  return size
    ? bucketBaseUrl + '%2Fimg_' + size + '_' + post.media[0].filename + '?alt=media'
    : bucketBaseUrl + '%2F' + post.media[0].filename + '?alt=media'
}
