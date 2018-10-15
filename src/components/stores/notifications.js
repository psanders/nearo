import { observable, when } from "mobx"
import { appStore } from './app'

class NotificationsStore {
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
    }

    showMustLogin = () => {
      this.showNotification('Please login', 10000,
        () => {
          console.log('DBG001')
          appStore.currentView('/profile')
      },  "Login")
    }

    showNotification = (message,
        timeout = 4000,
        callback = null,
        callbackLabel = "Undo",
        closeable = true) => {
      const state = {
        open: true,
        message: message,
        timeout: timeout,
        showUndo: false,
      }

      if (callback) {
        console.log('DBG002')
        state.callback = callback
        state.callbackLabel = callbackLabel
      }
      console.log('state', JSON.stringify(state))
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
