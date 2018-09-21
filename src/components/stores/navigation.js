import { observable } from "mobx"
import { fetchUserInfo, storeUserInfo } from '../commons/dbfunctions'

class NavStore {
    @observable loaded = false
    @observable navInfo = {
      searchTerm: '',
      locInfo: {
        address: 'USA',
        latLng: {
          lat: 37.09024,
          lng: -95.71289100000001
        }
      }
    }

    constructor () {
      fetchUserInfo('locator')
      .then(info => {
        if(info) {
          this.navInfo.locInfo = info
          this.loaded = true
        } else {

          storeUserInfo('locator', JSON.parse(JSON.stringify(this.navInfo.locInfo)),
            () => this.loaded = true )
        }
        console.log('STEP 2.X')
      })
      .catch(error => {
        console.log(error)
      })
    }

    setNavInfo = (navInfo) => {
      this.navInfo = navInfo
    }

    isLoaded = () => this.loaded
}

export const navStore = new NavStore()
