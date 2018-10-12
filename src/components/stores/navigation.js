import { observable } from "mobx"
import { fetchUserInfo, storeUserInfo } from '../commons/dbfunctions'
import { askForLocation } from '../commons/geocoder/geocoder'

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

    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async initLocation () {
      try {
        // Already has a location
        let locInfo = await fetchUserInfo('locator')
        if(locInfo) {
          this.navInfo.locInfo = locInfo
          this.loaded = true
          return
        }

        // I don't know how long this is going to take...
        this.loaded = true
        // Wait for a bit
        await this.timeout(10000);
        // Or... Ask the user to provide location
        locInfo = await askForLocation()

        if(locInfo) {
          this.navInfo.locInfo = locInfo
          storeUserInfo('locator', JSON.parse(JSON.stringify(locInfo)),
            () => this.loaded = true )
          return
        }
      } catch(error) {
        // Or try getting the address using the users IP
        storeUserInfo('locator',
          JSON.parse(JSON.stringify(this.navInfo.locInfo)),
            () => this.loaded = true )
        throw error
      }
    }

    constructor () {
      this.initLocation().catch(error => console.log(error))
    }

    setNavInfo = (navInfo) => {
      this.navInfo = navInfo
    }

    isLoaded = () => this.loaded
}

export const navStore = new NavStore()
