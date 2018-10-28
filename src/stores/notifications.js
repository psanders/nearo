import { observable, when } from "mobx"

import { usersStore } from './users'
import { appStore } from './app'
import { currentPath } from '../components/commons/utils'

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

    isPromptLogin = () => navigator.onLine !== false &&
      appStore.isReady() &&
      !usersStore.isSignedIn() &&
      currentPath(1) !== 'login'

    async promptLogin () {
      try {
        when(
          () => this.isPromptLogin(),
          () => {
            // By now the login status has been confirm
            // Please ensure that this is not a bad practice :P
            setTimeout(() => {
              if(!usersStore.isSignedIn()) {
                this.hideLoginNotification = false
              }
            }, 2000)
          }
        )
      } catch(error) {
        throw error
      }
    }

    showMustLogin = () => {
      if(!this.hideLoginNotification) {
        return
      }
      // I'm passing push as a reference index.js
      // Not the most elegant but it works
      this.showNotification('Please sign in', 10000,
        () => this.push('/login') , "Sign In")
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
