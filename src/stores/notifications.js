import { observable, when } from "mobx"

import { usersStore } from './users'
import { appStore } from './app'
import { timeout } from '../components/commons/utils'

class NotificationsStore {
    @observable hideLoginNotification = true
    @observable notificationId = 'signup'
    @observable state = {
      open: false,
      message: "",
      timeout: 4000
    }

    constructor () {
      when(
        () => navigator.onLine === false,
        () => {
          this.showNotification("No connection", 60000)
        }
      )

      this.promptLogin().catch(error => console.log(error))
    }

    async promptLogin () {
      try {
        await timeout(5000);

        when(
          () => navigator.onLine !== false &&
            appStore.isReady() &&
            !usersStore.isSignedIn(),
          () => {
            this.hideLoginNotification = false
          }
        )
      } catch(error) {
        throw error
      }
    }

    showMustLogin = () => {
      // I'm passing push as a reference index.js
      // Not the most elegant but it works
      this.showNotification('Please login', 10000,
        () => this.push('/login') , "Login")
    }

    showNotification = (message,
        timeout = 4000,
        callback = null,
        callbackLabel = "Undo") => {
      const state = {
        open: true,
        message: message,
        timeout: timeout,
        showUndo: false,
      }

      if (callback) {
        state.callback = callback
        state.callbackLabel = callbackLabel
      }
      this.state = state
    }

    hideNotification = () => {
      const state = {
        open: false,
        message: ""
      }
      this.state = state
    }
}

export const notificationsStore = new NotificationsStore()
