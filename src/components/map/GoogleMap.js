import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'

class GMap extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  render() {

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBJWWg7cJV5835KCpmNsG2D2UwBbs0EY9Y" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          { this.props.store.posts.map(post => <Marker latLng={ post._geoloc } />) }
        </GoogleMapReact>
      </div>
    )
  }
}

export default GMap
