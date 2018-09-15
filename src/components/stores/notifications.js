import { observable } from "mobx"

class NotificationsStore {
    @observable state = {
      open: false,
      message: "",
      showUndo: false,
      timeout: 0
    }

    showNotification = (message, timeout = 0, undoCallback = null) => {
      const state = {
        open: true,
        message: message,
        timeout: timeout,
        showUndo: false
      }

      if (undoCallback) {
        state.showUndo = true
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
