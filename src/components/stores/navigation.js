import { observable } from "mobx"
import { fetchUserInfo } from '../commons/dbfunctions'

class NavStore {
    @observable loaded = false
    @observable navInfo = { searchTerm: '' }

    constructor () {
      fetchUserInfo('topnav-locator')
      .then(info => {
        if(info) {
          this.navInfo.latLng = info.latLng
        }
        this.loaded = true
      })
      .catch(error => {
        console.log(error)
      })
    }

    isLoaded = () => this.loaded
}

export const navStore = new NavStore()
