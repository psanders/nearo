import { observable, when, autorun } from "mobx"
import { computed } from 'mobx'
import { db } from '../components/commons/firebase/firebase'
import { usersStore } from './users'
import { bookmarksStore } from './bookmarks'
import { notificationsStore } from './notifications'
import { navStore } from './navigation'
import { appStore } from './app'
import { doSearchAlgolia } from '../components/commons/firebase/algolia'
import firebase from 'firebase/app'
import { hasMedia } from '../components/commons/utils'

const maxItemperPage = 20 // It will load those 20 items super fast!

class PostsStore {
  @observable postDialogOpen = false
  @observable posts = []
  @observable favPosts = []
  @observable staffPick = []
  @observable currentPost = null
  @observable nbHits = 0
  @observable deletedPost
  @observable loading
  @observable postHighlighted = null
  @observable postsInViewport = new Map()

  constructor () {

    when(
      () => appStore.isReady() && usersStore.isSignedIn(),
      () => {
        this.updateBySearch(navStore.navInfo)
        this.loadFavorities()
      }
    )

    when(
      () => appStore.isReady() && !usersStore.isSignedIn(),
      () => {
        this.updateBySearch(navStore.navInfo)
      }
    )

    when(
      () => appStore.isReady(),
      () => this.loadStaffPick()
    )

    autorun(() => this.updateBySearch(navStore.navInfo))
  }

  @computed get keepScrolling() {
    return !this.loading &&
      this.nbHits > 0 &&
      this.posts.length < this.nbHits ? true : false
  }

  loadFavorities() {
    if (!usersStore.currentUser.id) {
      return
    }
    this.favPosts.replace([])
    bookmarksStore.bookmarks.map(bookmark => {
      return db.collection('posts').doc(bookmark).get()
      .then(value => {
        const post = value.data()
        post.id = value.id
        this.favPosts.push(post)
        return
      })
    })
  }

  loadStaffPick() {
    this.staffPick.replace([])
    bookmarksStore.staffBookmarks.forEach(bookmark => {
      db.collection('posts').doc(bookmark).get()
      .then(value => {
        const post = value.data()
        post.id = value.id
        if (hasMedia(post)) {
          this.staffPick.push(post)
        }
      })
    })
  }

  isPostDialogOpen = () => this.postDialogOpen

  openPostDialog = () => {
    if(!usersStore.isSignedIn()) {
      notificationsStore.showMustLogin()
      return
    }
    this.postDialogOpen = true
  }

  hidePostDialog = () => this.postDialogOpen = false

  updateBySearch = (navInfo, offset = 0) => {
    this.loading = true
    let query = {
      query: navInfo.searchTerm,
      offset: offset,
      length: maxItemperPage
    }

    if (navInfo.locInfo && navInfo.locInfo.latLng) {
      query.aroundLatLng = navInfo.locInfo.latLng.lat + ","
        + navInfo.locInfo.latLng.lng
      query.minimumAroundRadius = 20000
    }

    doSearchAlgolia(query, (results, nbHits) => {
      this.updatePosts(results, offset)
      this.nbHits = nbHits
      this.loading = false
    })
  }

  updatePosts = (posts, doConcact) => {
    if (!posts) return

    const bookmarks = bookmarksStore.bookmarks

    posts.forEach(post => {
      bookmarks.forEach(x => {
        if(x === post.id) {
          post.bookmarked = true
        }
      })
    })

    if(doConcact) {
      posts = this.posts.concat(posts)
    }

    this.posts = posts
  }

  showMoreResults = () => this.updateBySearch(navStore.navInfo, this.posts.length)

  addNewPost = post => this.posts.unshift(post)

  handlePostDelete = (post) => {
    this.deletedPost = post
    const postRef = db.collection('posts').doc(post.id)
    postRef.set({
      deleted: true,
      deletedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
    }, { merge: true }).then(() => {
      this.posts = this.posts.filter(p => p.id !== post.id)
      notificationsStore.showNotification('Post deleted', 4000, this.handleUndeletePost)
    }).catch(error => {
      notificationsStore.showNotification('Something when wrong :( Please try again later')
      console.error(error)
    })
  }

  handleUndeletePost = () => {
    const postRef = db.collection('posts').doc(this.deletedPost.id)
    postRef.set({
      deleted: false,
      deletedTimestamp: firebase.firestore.Timestamp.fromDate(new Date())
    }, { merge: true }).then(() => {
      this.deletedPost.deleted = false
      this.posts.unshift(this.deletedPost)
    }).catch(error => {
      console.error(error)
      notificationsStore.showNotification('Something when wrong :( Please try again later')
    })
  }

  async markSold(post) {
    const postRef = db.collection('posts').doc(post.id)
    post.sold = !post.sold
    this.findAndReplace(post)

    await postRef.set({sold: post.sold }, { merge: true })

    if (post.sold) {
      notificationsStore.showNotification('Post marked as sold')
    } else {
      notificationsStore.showNotification('Post marked as available')
    }

    /*postRef.set({
       sold: post.sold
    }, { merge: true }).then(() => {
      if(post.sold) {
        notificationsStore.showNotification('Post marked as sold')
      } else {
      }
    }).catch(error => {
      console.error("Error writing document: ", error)
    })*/
  }

  findAndReplace = post => {
    const index = this.posts.findIndex(currentPost => {
      return currentPost.id === post.id
    })
    this.posts[index] = post
  }

  highlightPost = post => this.postHighlighted = post

  addVisiblePost = post => this.postsInViewport.set(post.id, post)

  removeNonVisiblePost = post => this.postsInViewport.delete(post.id)
}

export const postsStore = new PostsStore()
