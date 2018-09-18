import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import { observer } from 'mobx-react'
import { when } from "mobx"

@observer
class GMap extends Component {
  state = {
    map: null,
    maps: null
  }

  static defaultProps = {
    center: {
      lat: 37.09024,
      lng: -95.71289100000001
    },
    zoom: 11
  }

  render() {

    const posts = this.props.postsStore.posts

    const getMapBounds = (map, maps, posts) => {
      const bounds = new maps.LatLngBounds()

      posts.forEach((post) => {
        bounds.extend(new maps.LatLng(
          post._geoloc.lat,
          post._geoloc.lng,
        ))
      })
      return bounds
    }

    const centerMap = (map, maps, posts) => {
      const bounds = getMapBounds(map, maps, posts)
      map.fitBounds(bounds)
    }

    when(
      () => this.state.map
            && this.state.maps
            && this.props.postsStore.posts,
      () => {
        centerMap(this.state.map, this.state.maps, posts.slice(0, 10))
    })

    return (
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals={true}
        bootstrapURLKeys={{ key: "AIzaSyBJWWg7cJV5835KCpmNsG2D2UwBbs0EY9Y" }}
        defaultCenter= { this.props.navStore.navInfo.locInfo.latLng }
        defaultZoom={ this.props.zoom }
        onGoogleApiLoaded={({ map, maps }) => {
          this.setState({map: map})
          this.setState({maps: maps})
        }}
      >
        {
          posts.map(post =>
          <Marker post={post} key={ post.id } latLng={ post._geoloc } />)
        }
      </GoogleMapReact>
    )
  }
}

export default GMap
