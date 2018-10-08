import { observable, when } from "mobx"
import { usersStore } from './users'
import { notificationsStore } from './notifications'
import { db } from '../commons/firebase/firebase'

class BookmarksStore {
    @observable bookmarks = []
    @observable loaded = false

    constructor() {
      when(
        () => usersStore.isStatusVerified() && usersStore.isSignedIn(),
        () => this.loadBookmarks(usersStore.currentUser)
      )

      when(
        () => usersStore.isStatusVerified() && !usersStore.isSignedIn(),
        () => {
          this.bookmarks = []
          this.loaded = true
        }
      )
    }

    loadBookmarks(user) {
      db.collection("bookmarks")
      .where("user", "==", user.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.bookmarks.push(doc.id)
        })
        this.loaded = true
      })
    }

    isLoaded = () => this.loaded

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

    addToBookmarks = (post) => {
      if (!usersStore.isSignedIn()) {
        notificationsStore.showMustLogin()
        return
      }

      this.bookmarks.push(post.id)
      this.updateLikes(post, 1)

      notificationsStore.showNotification('Added to your liked posts')
      const bookmarksRef = db.collection('bookmarks').doc(post.id)

      bookmarksRef.set({
        user: usersStore.currentUser.id
      }, { merge: true }).then(() => {
      }).catch(error => {
        // Revert change in UI
        console.error("Error writing document: ", error)
      })
    }

    removeFromBookmarks = (post) => {
      if (!usersStore.isSignedIn()) {
        notificationsStore.showMustLogin()
        return
      }

      this.bookmarks.pop(post.id)
      this.updateLikes(post, -1)

      const bookmarksRef = db.collection('bookmarks').doc(post.id)
      notificationsStore.showNotification('Removed from your liked posts')

      bookmarksRef.delete()
      .then(() => {
      }).catch(error => {
        console.error("Error writing document: ", error)
      })
    }

    setData (bookmarks) {
      this.bookmarks = bookmarks
    }
}

export const bookmarksStore = new BookmarksStore()
