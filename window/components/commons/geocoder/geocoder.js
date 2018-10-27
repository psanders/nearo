import NodeGeocoder from 'node-geocoder'

const apiInfo = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyBJWWg7cJV5835KCpmNsG2D2UwBbs0EY9Y',
  formatter: null
}

const geocoder = NodeGeocoder(apiInfo)

export const askForLocation = () => {
  const options = {
    enableHighAccuracy: false,
    maximumAge: 0
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      // Using callback
      geocoder.reverse({lat:pos.coords.latitude, lon:pos.coords.longitude}, (err, data) => {
        const locInfo = {
          address: data[0].city,
          latLng: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
        }
        resolve(locInfo)
      })
    }, err => {
      reject(err)
    }, options)
  })
}
