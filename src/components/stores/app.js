import { observable, when } from "mobx"
import { usersStore } from './users'
import { bookmarksStore } from './bookmarks'
import { navStore } from './navigation'
import { currentPath } from '../commons/utils'

class AppStore {
    @observable ready = false
    @observable loading = true
    @observable curView

    constructor () {
      when(
        () => navigator.onLine === false || (usersStore.isStatusVerified()
          && bookmarksStore.isLoaded()
          && navStore.isLoaded()),
        () => {
          this.ready = true
          this.loading = false
        }
      )
    }

    currentView = view => {
      if (view) {
        this.curView = view
      } else if (!this.curView && currentPath()) {
        return '/' + currentPath()
      }
      window.history.pushState({}, document.title, '/');
      return this.curView || '/'
    }

    isReady = () => this.ready
}

export const appStore = new AppStore()
