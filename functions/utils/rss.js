const functions = require('firebase-functions')
const admin = require('firebase-admin')
const RSS = require('rss')
const utils = require('./utils')
const constants = require('./constants')

exports.generateFeed = (callback) => {
  /* lets create an rss feed */
  const feed = new RSS({
    title: constants.siteInfo.name,
    description: constants.siteInfo.description,
    feed_url: constants.siteInfo.url + "/rss.xml",
    site_url: constants.siteInfo.url,
    image_url: constants.siteInfo.logoUrl,
    docs: constants.siteInfo.url + '/about',
    managingEditor: constants.siteInfo.webmaster.name,
    webMaster: constants.siteInfo.webmaster.name,
    copyright: new Date().getFullYear() + ' ' + constants.siteInfo.webmaster.name,
    language: 'en',
    categories: [''],
    pubDate: new Date(),
    ttl: '60'
  })

  admin.firestore().collection('posts')
    .where("deleted", "==", false)
    .limit(10)
    .orderBy("timestamp", "desc")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        const post = snapshot.data()
        post.id = snapshot.id

        let description = post.body

        if (utils.imageURL(post, 'sm')) {
          description = `<img src="${utils.imageURL(post, 'sm')}"/><br />"`
            + description
        }

        feed.item({
          title: post.title,
          description: description,
          url: constants.siteInfo.url + '/posts/' + post.id,
          categories: [post.category],
          author: post.author,
          enclosure: {url: utils.imageURL(post)},
          date: post.timestamp,
          lat: post._geoloc.lat,
          long: post._geoloc.lng,
        })
      })
    callback(feed.xml())
    return
  }).catch(error => {
    console.error(error)
  })
}
