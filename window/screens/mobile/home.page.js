import React, { Component, Fragment } from 'react'
import SearchBar from '../../components/mobile/searchbar/SearchBar'
import PostList from '../../components/mobile/postlist/PostList'

class HomePage extends Component {
  render () {
    return <Fragment>
      <SearchBar />
      <PostList />
    </Fragment>
  }
}

export default HomePage
