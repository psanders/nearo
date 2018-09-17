import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import { observer } from 'mobx-react'

@observer
class GMap extends Component {

  static defaultProps = {
    center: {
      lat: 37.09024,
      lng: -95.71289100000001
    },
    zoom: 11
  }

  render() {

    return (
      <div style={{ height: 'calc(100vh - 65px)', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBJWWg7cJV5835KCpmNsG2D2UwBbs0EY9Y" }}
          defaultCenter= { this.props.center }
          defaultZoom={ this.props.zoom }
          center={ this.props.navStore.navInfo.locInfo.latLng }
        >
          {
            this.props.postsStore.posts.map(post =>
            <Marker post={post} key={ post.id } latLng={ post._geoloc } />)
          }
        </GoogleMapReact>
      </div>
    )
  }
}

export default GMap
