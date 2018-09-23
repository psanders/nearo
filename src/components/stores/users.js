import { observable } from "mobx"
import { auth, db } from '../commons/firebase/firebase'
import {
  fetchUserInfo,
  storeUserInfo,
  removeUserInfo
} from '../commons/dbfunctions'

class UsersStore {
    @observable currentUser = null
    @observable statusVerified = false

    constructor() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.loadUser(user)
        } else {
          this.currentUser = null
          this.statusVerified = true
          removeUserInfo('user-info')
        }
      })
    }

    loadUser (user) {
      fetchUserInfo('user-info')
      .then(userInfo => {
        if (userInfo && userInfo.email === user.email) {
          this.currentUser = userInfo
          this.statusVerified = true
        } else {
          // Fallback
          this.fetchUserInfoFromDB(user)
        }
      })
    }

    fetchUserInfoFromDB (user) {
      const email = user.email ? user.email : user.providerData[0].email
      const userRef = db.collection('users').doc(email)
      userRef.get()
      .then(userInfo => {
        if(userInfo.exists) {
          this.currentUser = userInfo.data()
          storeUserInfo('user-info', JSON.parse(JSON.stringify(this.currentUser)))
        } else {
          removeUserInfo('user-info')
        }
        this.statusVerified = true
      })
      .catch(error => {
        console.log('Unable to complete operation', error)
      })
    }

    isStatusVerified = () => this.statusVerified

    isSignedIn = () => this.currentUser? true : false

    setCurrentUser(user) {
      this.currentUser = user
    }
}

export const usersStore = new UsersStore()
