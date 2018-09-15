import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { observer } from 'mobx-react'

@observer
class GMap extends Component {
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

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBJWWg7cJV5835KCpmNsG2D2UwBbs0EY9Y" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.state.center}
        />
      </div>
    )
  }
}

export default GMap
