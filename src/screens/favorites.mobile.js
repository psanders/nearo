import React, { Component, Fragment } from 'react'
import PostsContainer from '../components/PostsContainer'

class HomePage extends Component {
  render () {
    return <Fragment>
      <PostsContainer favorites/>
    </Fragment>
  }
}

export default HomePage
