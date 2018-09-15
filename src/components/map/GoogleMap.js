import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { observer } from 'mobx-react'

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
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBJWWg7cJV5835KCpmNsG2D2UwBbs0EY9Y" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.state.center}
        >

        </GoogleMapReact>
        console.log(this.props.appState)
      </div>
    )
  }
}

export default SimpleMap
