import { observable } from "mobx"
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { fetchUserInfo, storeUserInfo } from '../components/commons/dbfunctions'
import { timeout, getUrlParam } from '../components/commons/utils'

const locationStorage = 'global-location'

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
      const searchTerm = getUrlParam("q")
      if(searchTerm) {
        this.navInfo.searchTerm = searchTerm
      }
      this.initLocation().catch(error => console.log(error))
    }

    async initLocation () {
      try {
        // Already has a location
        let locInfo = await fetchUserInfo(locationStorage)
        if(locInfo) {
          this.navInfo.locInfo = locInfo
          this.loaded = true
          return
        }

        // I don't know how long this is going to take...
        this.loaded = true
        // Wait for a bit
        await timeout(10000);
        // Or... Ask the user to provide location
        /*locInfo = await askForLocation()

        if(locInfo) {
          this.navInfo.locInfo = locInfo
          storeUserInfo(locationStorage, JSON.parse(JSON.stringify(locInfo)),
            () => this.loaded = true )
          return
        }*/
      } catch(error) {
        // Or try getting the address using the users IP
        storeUserInfo(locationStorage,
          JSON.parse(JSON.stringify(this.navInfo.locInfo)),
            () => this.loaded = true )
        throw error
      }
    }

    async relocate (address) {
      const results = await geocodeByAddress(address)
      const latLng = await getLatLng(results[0])
      this.navInfo.locInfo.address = address
      this.navInfo.locInfo.latLng = latLng
      storeUserInfo(locationStorage, JSON.parse(JSON.stringify(this.navInfo.locInfo)))
      return this.navInfo.locInfo
    }

    setNavInfo = (navInfo) => {
      this.navInfo = navInfo
    }

    isLoaded = () => this.loaded
}

export const navStore = new NavStore()
