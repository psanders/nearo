import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
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
      <Paper square elevation={0}>
        <a href="/explore" >Go to explore</a>
      </Paper>

    </div>
  }
}

export default HomePage
