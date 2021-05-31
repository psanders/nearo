import { observable, when } from "mobx"
import { usersStore } from './users'
import { notificationsStore } from './notifications'
import { db } from '../components/commons/firebase/firebase'
import firebase from 'firebase/app'

class BookmarksStore {
    @observable bookmarks = []
    @observable staffBookmarks = []
    @observable sbLoaded = false
    @observable loaded = false

    constructor() {
      when(
        () => usersStore.isStatusVerified() && usersStore.isSignedIn(),
        () => {
          this.loadBookmarks(usersStore.currentUser)
        }
      )

      when(
        () => usersStore.isStatusVerified() && !usersStore.isSignedIn(),
        () => {
          this.bookmarks = []
          this.loaded = true
        }
      )

      this.loadStaffBookmars()
    }

    loadBookmarks(user) {
      const likes = db.collection("bookmarks").doc(user.id)
      likes
      .get()
      .then(doc => {
        if (doc.exists) {
          doc.data().posts.forEach(postId => {
            this.bookmarks.push(postId)
          })
        }
        this.loaded = true
      })
    }

    loadStaffBookmars() {
      // WARNING: Hardcode alert :s
      const likes = db.collection('bookmarks').doc('sanderspedro@gmail.com')
      likes
      .get()
      .then(doc => {
        if (doc.exists) {
          
          doc.data().posts.forEach(postId => {
            console.log('yyyy: ' + postId)
            this.staffBookmarks.push(postId)
          })
        }
        this.sbLoaded = true
      })
    }

    isLoaded = () => this.loaded && this.sbLoaded

    updateLikes = (post, up = 1) => {
      const postRef = db.collection('posts').doc(post.id)
      post.likes = post.likes + up
      postRef.set({
        likes: post.likes
      }, { merge: true }).then(() => {
      }).catch(error => {
        // Revert change in UI
        console.error("Error writing document: ", error)
      })
    }

    addToBookmarks = (post, user) => {
      if (!usersStore.isSignedIn()) {
        notificationsStore.showMustLogin()
        return
      }

      this.bookmarks.push(post.id)
      this.updateLikes(post, 1)

      notificationsStore.showNotification('Added to your liked posts')
      const bookmarksRef = db.collection('bookmarks').doc(user.id)

      bookmarksRef.set({
        posts: firebase.firestore.FieldValue.arrayUnion(post.id)
      }, {merge: true})
    }

    removeFromBookmarks = (post, user) => {
      if (!usersStore.isSignedIn()) {
        notificationsStore.showMustLogin()
        return
      }

      this.bookmarks.pop(post.id)
      this.updateLikes(post, -1)

      const bookmarksRef = db.collection('bookmarks').doc(user.id)
      notificationsStore.showNotification('Removed from your liked posts')

      bookmarksRef.set({
        posts: firebase.firestore.FieldValue.arrayRemove(post.id)
      }, {merge: true})
    }

    setData (bookmarks) {
      this.bookmarks = bookmarks
    }
}

export const bookmarksStore = new BookmarksStore()
