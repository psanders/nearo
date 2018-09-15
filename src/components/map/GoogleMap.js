import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import { fetchUserInfo } from '../commons/dbfunctions'
import Marker from './Marker'

class SimpleMap extends Component {
  state = {
    center: {}
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  componentDidMount = () => {
    fetchUserInfo('topnav-locator')
    .then(locInfo => {
      if (locInfo) {
        this.setState({center: locInfo.latLng})
      }
    })
  }

  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBJWWg7cJV5835KCpmNsG2D2UwBbs0EY9Y" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.state.center}
        >
          <Marker latLng={{lat: 19.7807686, lng:-70.68710909999999}} />
        </GoogleMapReact>
      </div>
    )
  }
}

export default SimpleMap
