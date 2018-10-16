import React, { Component, Fragment } from 'react'
import SearchBar from '../../components/mobsearchbar/SearchBar'
import PostsContainer from '../../components/PostsContainer'

class HomePage extends Component {
  render () {
    return <Fragment>
      <SearchBar />
      <PostsContainer />
    </Fragment>
  }
}

export default HomePage
