import { observable, when, autorun } from "mobx"
import { db } from '../commons/firebase/firebase'
import { usersStore } from './users'
import { bookmarksStore } from './bookmarks'
import { notificationsStore } from './notifications'
import { navStore } from './navigation'
import { appStore } from './app'
import { doSearchAlgolia } from '../commons/firebase/algolia'

const maxItemperPage = 20

class PostsStore {
    @observable postDialogOpen = false
    @observable posts = []
    @observable currentPost = null
    @observable nbHits = 0
    @observable deletedPost
    @observable loading

    constructor () {
      when(
        () => appStore.isReady() && usersStore.isSignedIn(),
        () => this.updateBySearch(navStore.navInfo)
      )

      when(
        () => appStore.isReady() && !usersStore.isSignedIn(),
        () => {
          this.updateBySearch(navStore.navInfo)
        }
      )

      autorun(() => this.updateBySearch(navStore.navInfo))
    }

    isPostDialogOpen = () => this.postDialogOpen

    openPostDialog = () => {
      if(!usersStore.isSignedIn()) {
        notificationsStore.showMustLogin()
        return
      } else if (usersStore.currentUser.isNewUser) {
        notificationsStore.showCompleteProfile()
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
        deletedTimestamp: Date.now()
      }, { merge: true }).then(() => {
        this.posts = this.posts.filter(p => p.id !== post.id)
        notificationsStore.showNotification('Post deleted', 0, this.handleUndeletePost)
      }).catch(error => {
        notificationsStore.showNotification('Something when wrong :( Please try again later')
        console.error(error)
      })
    }

    handleUndeletePost = () => {
      const postRef = db.collection('posts').doc(this.deletedPost.id)
      postRef.set({
        deleted: false,
        deletedTimestamp: Date.now()
      }, { merge: true }).then(() => {
        this.deletedPost.deleted = false
        this.posts.unshift(this.deletedPost)
      }).catch(error => {
        console.error(error)
        notificationsStore.showNotification('Something when wrong :( Please try again later')
      })
    }

    markSold = (post) => {
      const postRef = db.collection('posts').doc(post.id)
      post.sold = !post.sold
      this.findAndReplace(post)
      postRef.set({
         sold: post.sold
      }, { merge: true }).then(() => {
        if(post.sold) {
          notificationsStore.showNotification('Post marked as sold')
        } else {
          notificationsStore.showNotification('Post marked as available')
        }
      }).catch(error => {
        console.error("Error writing document: ", error)
      })
    }

    findAndReplace = post => {
      const index = this.posts.findIndex(currentPost => {
        return currentPost.id === post.id
      })
      this.posts[index] = post
    }
}

export const postsStore = new PostsStore()
