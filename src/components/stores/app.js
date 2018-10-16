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

      if (this.curView === '/') {
        window.history.pushState({}, document.title, '/')
      } if ((this.curView === '/profile' || this.curView === '/login')
          && !usersStore.isSignedIn()){
        window.history.pushState({}, document.title, '/login')
        return '/login'
      }

      return this.curView || '/'
    }

    isReady = () => this.ready
}

export const appStore = new AppStore()
