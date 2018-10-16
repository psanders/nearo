import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import FavList from '../../components/mobfavlist/FavList'
import Nothing from '../../components/nothing/Nothing'

@inject('postsStore')
@observer
class Favorites extends Component {
  render () {
    return <Fragment>
      { this.props.postsStore.favPosts.length > 0 && <FavList /> }
      { this.props.postsStore.favPosts.length === 0 && <Nothing /> }
    </Fragment>
  }
}

export default Favorites
