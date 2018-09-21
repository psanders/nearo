import NodeGeocoder from 'node-geocoder'

const apiInfo = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyBJWWg7cJV5835KCpmNsG2D2UwBbs0EY9Y',
  formatter: null
}

const geocoder = NodeGeocoder(apiInfo)

export const showCurrentLocation = () => {
  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      // Using callback
      geocoder.reverse({lat:pos.coords.latitude, lon:pos.coords.longitude}, (err, data) => {
        const info = {
          city: data[0].city,
          state: data[0].administrativeLevels.level1short,
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }
        resolve(info)
      })
    }, err => {
        reject(err)
    }, options)
  })
}
