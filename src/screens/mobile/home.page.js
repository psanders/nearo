import React, { Component } from 'react'
import PostList from 'components/mobile/postlist/PostList'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import WelcomeBanner from 'components/mobile/welcomebanner/WelcomeBanner'

@inject('routing')
@inject('appStore')
@observer
class HomePage extends Component {
  @computed get introBannerStatus () {
    return this.props.appStore.closedIntroBanner
  }

  render () {
    return <div>
      { !this.props.appStore.isIntroBannerClosed() && <WelcomeBanner /> }
      <PostList />
    </div>
  }
}

export default HomePage
