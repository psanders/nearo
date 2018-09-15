import { observable, when } from "mobx"
import { usersStore } from './users'
import { bookmarksStore } from './bookmarks'

class AppStore {
    @observable ready = false

    constructor () {
      when(
        () => usersStore.isStatusVerified() && bookmarksStore.isLoaded(),
        () => {
          this.ready = true
        })
    }

    isReady = () => this.ready

}

export const appStore = new AppStore()
