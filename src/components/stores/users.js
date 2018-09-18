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
        console.log('DBG001')
        if(userInfo.exists) {
          console.log('DBG002')
          this.currentUser = userInfo.data()
          storeUserInfo('user-info', JSON.parse(JSON.stringify(this.currentUser)))
          console.log('DBG003')
        } else {
          console.log('DBG004')
          removeUserInfo('user-info')
        }
        console.log('DBG005')
        this.statusVerified = true
      })
      .catch(error => {
        console.log('Unable to complete operation', error)
      })
    }

    isStatusVerified = () => this.statusVerified

    isSignedIn = () => this.currentUser? true : false

}

export const usersStore = new UsersStore()
