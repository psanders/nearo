import { observable, when } from "mobx"
import { usersStore } from './users'
import { bookmarksStore } from './bookmarks'
import { navStore } from './navigation'

import { fetchUserInfo } from 'components/commons/dbfunctions'

class AppStore {
    @observable ready = false
    @observable loading = true
    @observable closedIntroBanner = false

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

      fetchUserInfo('closed-intro-banner')
      .then(status => {
        if(status) {
          this.closedIntroBanner = true
        }
      })
    }

    isReady = () => this.ready

    closeIntroBanner = () => this.closedIntroBanner = true

    isIntroBannerClosed = () => this.closedIntroBanner
}

export const appStore = new AppStore()
