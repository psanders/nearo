import { observable } from "mobx"
import { openURL } from '../commons/utils'

class NotificationsStore {
    @observable state = {
      open: false,
      message: "",
      timeout: 4000
    }

    showMustLogin = () => {
      this.showNotification('Sorry! You must login first')
    }

    showNotification = (message, timeout = 4000, callback = null, callbackLabel = "Undo") => {
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
