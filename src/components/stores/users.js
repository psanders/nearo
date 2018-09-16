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
        if (userInfo) {
          this.currentUser = userInfo
          this.statusVerified = true
        } else {
          // Fallback
          this.fetchUserInfoFromDB(user)
        }
      })
    }

    fetchUserInfoFromDB (user) {
      const userRef = db.collection('users').doc(user.email)
      userRef.get()
      .then(userInfo => {
        if(userInfo.exists) {
          this.currentUser = userInfo.data()
          storeUserInfo('user-info', userInfo.data())
        } else {
          removeUserInfo('user-info')
        }
        this.statusVerified = true
      })
      .catch(error => {
        console.log(error)
      })
    }

    isStatusVerified = () => this.statusVerified

    isSignedIn = () => this.currentUser? true : false

}

export const usersStore = new UsersStore()
