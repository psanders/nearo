import { observable, when } from "mobx"
import { usersStore } from './users'
import { bookmarksStore } from './bookmarks'
import { navStore } from './navigation'

class AppStore {
    @observable ready = false

    constructor () {
      when(
        () => usersStore.isStatusVerified()
              && bookmarksStore.isLoaded()
              && navStore.isLoaded(),
        () => this.ready = true
      )
    }

    isReady = () => this.ready
}

export const appStore = new AppStore()
