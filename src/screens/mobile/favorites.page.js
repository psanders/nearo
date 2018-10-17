import React, { Component } from 'react'
import FavList from '../../components/mobfavlist/FavList'
import NothingPage from './nothing.page'

import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

@inject('postsStore')
@observer
class Favorites extends Component {
  @computed get posts () {
    return this.props.postsStore.favPosts
  }

  componentDidMount() {
    this.props.postsStore.loadFavorities()
  }

  render = () => this.posts.length > 0
    ? <FavList posts={ this.posts }/>
    : <NothingPage />
}

export default Favorites
