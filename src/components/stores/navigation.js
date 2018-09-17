import { observable } from "mobx"
import { fetchUserInfo, storeUserInfo } from '../commons/dbfunctions'

class NavStore {
    @observable loaded = false
    @observable navInfo = { searchTerm: '' }
    @observable address = ''

    constructor () {
      fetchUserInfo('locator')
      .then(info => {
        if(info) {
          this.navInfo.latLng = info.latLng
          this.address = info.address
          this.loaded = true
        } else {
          this.navInfo.latLng = {lat: 37.09024, lng: -95.71289100000001}
          this.address = 'USA'
          storeUserInfo('locator',
            { latLng: this.navInfo.latLng,address: this.address },
            () => this.loaded = true
          )
        }
      })
      .catch(error => {
        console.log(error)
      })
    }

    isLoaded = () => this.loaded
}

export const navStore = new NavStore()
