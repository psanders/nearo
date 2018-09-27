import { observable, when } from "mobx"
import { auth, db } from '../commons/firebase/firebase'
import { doSignOut } from '../commons/firebase/auth'
import { openURL } from '../commons/utils'
import {
  fetchUserInfo,
  storeUserInfo,
  removeUserInfo
} from '../commons/dbfunctions'

const initUser = {username: '', password: '', name: '', email: ''}

class UsersStore {
    @observable currentUser = initUser
    @observable statusVerified = false
    @observable signedIn = false

    constructor() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.loadUser(user)
        } else {
          this.statusVerified = true
          removeUserInfo('user-info')
        }
      })

      when(
        () => this.mustCompleteProfile(),
        () => openURL('/completeprofile')
      )
    }

    mustCompleteProfile = () => this.currentUser.isNewUser
      && this.statusVerified
      && window.location.pathname !== "/completeprofile"

    loadUser (user) {
      fetchUserInfo('user-info')
      .then(userInfo => {
        if (userInfo && userInfo.email === user.email) {
          this.currentUser = userInfo
          this.statusVerified = true
          this.signedIn = true
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
          this.signedIn = true
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

    isSignedIn = () => this.signedIn

    doSignOut = () => {
      doSignOut()
      removeUserInfo('user-info')
      this.signedIn = false
      this.setCurrentUser(initUser)
    }

    setCurrentUser(user) {
      this.currentUser = user
    }
}

export const usersStore = new UsersStore()
