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
    let isScrolling
    window.addEventListener("scroll", event => {
      if (this.state.map && this.state.maps) {
        window.clearTimeout( isScrolling )
        isScrolling = setTimeout(() => {
          this.centerMap(this.state.map, this.state.maps,
            Array.from( this.props.postsStore.postsInViewport.values()))
        }, 500)
      }
    }, false);
  }

  render() {
    const posts = this.props.postsStore.posts
    const {center, zoom} = this.props

    // Initial center!
    when(() => this.state.map && this.state.maps && this.props.postsStore.posts, () => {
      this.centerMap(this.state.map, this.state.maps, posts.slice(0, 10))
    })

    return (<GoogleMapReact yesIWantToUseGoogleMapApiInternals={true} bootstrapURLKeys={{
        key: "AIzaSyA2sqesH5AcQiQItt41d3E4NjNrL_udVWw"
      }} defaultCenter={center} defaultZoom={zoom} onGoogleApiLoaded={({map, maps}) => {
        this.setState({map: map})
        this.setState({maps: maps})
      }}>
      {posts.map(post => <Marker post={post} key={post.id} latLng={post._geoloc}/>)}
    </GoogleMapReact>)
  }
}

export default GMap
