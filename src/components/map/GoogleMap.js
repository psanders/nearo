import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import { observer } from 'mobx-react'

@observer
class GMap extends Component {

  static defaultProps = {
    center: {
      lat: 19.7807686,
      lng: -70.68710909999999
    },
    zoom: 11
  }

  render() {

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBJWWg7cJV5835KCpmNsG2D2UwBbs0EY9Y" }}
          defaultCenter= { this.props.center }
          defaultZoom={ this.props.zoom }
          center={ this.props.navStore.navInfo.latLng }
        >
          { this.props.postsStore.posts.map(post => <Marker key={ post.id } latLng={ post._geoloc } />) }
        </GoogleMapReact>
      </div>
    )
  }
}

export default GMap
