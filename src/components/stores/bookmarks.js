import { observable, when } from "mobx"
import { usersStore } from './users'
import { notificationsStore } from './notifications'
import { db } from '../commons/firebase/firebase'

class BookmarksStore {
    @observable bookmarks = []
    @observable loaded = false

    constructor() {
      when(
        () => usersStore.isStatusVerified(),
        () => {
          if (usersStore.isSignedIn()) {
            this.loadBookmarks(usersStore.currentUser)
          } else {
            this.loaded = true
          }
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

    addToBookmarks = (post) => {
      if (!usersStore.isSignedIn()) {
        notificationsStore.showMustLogin()
        return
      }
      const bookmarksRef = db.collection('bookmarks').doc(post.id)
      bookmarksRef.set({
        user: usersStore.currentUser.email
      }, { merge: true }).then(() => {
        notificationsStore.showNotification('Noted!')
        this.bookmarks.push(post.id)
      }).catch(error => {
        // Revert change in UI
        console.error("Error writing document: ", error)
      })
    }

    removeFromBookmarks = (post) => {
      const bookmarksRef = db.collection('bookmarks').doc(post.id)
      bookmarksRef.delete()
      .then(() => {
        this.bookmarks.pop(post.id)
        notificationsStore.showNotification('Unliked')
      }).catch(error => {
        console.error("Error writing document: ", error)
      })
    }

    setData (bookmarks) {
      this.bookmarks = bookmarks
    }
}

export const bookmarksStore = new BookmarksStore()
