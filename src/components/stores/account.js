import { observable } from "mobx"
import { auth } from '../commons/firebase/firebase'
import { notificationsStore } from './notifications'

class AccountStore {
    @observable email = null
    @observable openDialog = false
    @observable pendingCred = null

    promptUserForPassword = (pendingCred, email) => {
      this.email = email
      this.pendingCred = pendingCred
      this.openDialog = true
    }

    linkAccounts = (password) => {
      const email = this.email
      const pendingCred = this.pendingCred

      auth.signInWithEmailAndPassword(email, password).then(user => {
        console.log('user', user)
        user.linkWithCredential(pendingCred)
        notificationsStore.showNotification("Accounts linked")
      }).catch(error => {
        notificationsStore.showNotification(error.message)
      })
      this.openDialog = false
      this.email = null
      this.pendingCred = null
    }
}

export const accountStore = new AccountStore()
