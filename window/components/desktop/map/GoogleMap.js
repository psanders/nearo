import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import { observer, inject } from 'mobx-react'
import { when } from "mobx"

@inject('navStore')
@inject('postsStore')
@observer
class GMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.09024,
      lng: -95.71289100000001
    },
    zoom: 11
  }
  state = {
    map: null,
    maps: null
  }

  getMapBounds = (map, maps, posts) => {
    const bounds = new maps.LatLngBounds()
    posts.forEach((post) => {
      bounds.extend(new maps.LatLng(post._geoloc.lat, post._geoloc.lng,))
    })
    return bounds
  }

  centerMap = (map, maps, posts) => {
    const bounds = this.getMapBounds(map, maps, posts)
    map.fitBounds(bounds)
  }

  componentDidMount() {
    when(() => this.state.map && this.state.maps && this.props.postsStore.pos, () => {
      console.log('this.props.postsStore.pos', this.props.postsStore.pos)
      this.centerMap(this.state.map, this.state.maps, this.props.postsStore.posts.slice(0, 10))
    })
  }

  render() {
    const posts = this.props.postsStore.posts
    const {center, zoom} = this.props

    return (<GoogleMapReact yesIWantToUseGoogleMapApiInternals={true} bootstrapURLKeys={{
        key: "AIzaSyBJWWg7cJV5835KCpmNsG2D2UwBbs0EY9Y"
      }} defaultCenter={center} defaultZoom={zoom} onGoogleApiLoaded={({map, maps}) => {
        this.setState({map: map})
        this.setState({maps: maps})
      }}>
      {posts.map(post => <Marker post={post} key={post.id} latLng={post._geoloc}/>)}
    </GoogleMapReact>)
  }
}

export default GMap
