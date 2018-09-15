import { observable } from "mobx"
import { auth } from '../commons/firebase/firebase'

class UsersStore {
    @observable currentUser = null
    @observable statusVerified = false

    constructor() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.currentUser = user
        } else {
          this.currentUser = null
        }
        this.statusVerified = true
      })
    }

    isStatusVerified = () => this.statusVerified

    isSignedIn = () => this.currentUser? true : false

}

export const usersStore = new UsersStore()
