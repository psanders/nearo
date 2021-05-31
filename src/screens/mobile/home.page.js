import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'

import Categories from 'components/mobile/categories/Categories.js'
import StaffPick from 'components/mobile/staffpick/StaffPick'
import WelcomeBanner from 'components/mobile/welcomebanner/WelcomeBanner'

@inject('routing')
@inject('appStore')
@inject('bookmarksStore')
@observer
class HomePage extends Component {
  state = {
    value: this.currentView,
  }

  @computed get currentView() {
    return this.props.routing.location.pathname
  }

  render () {
    const style = {
      anchor: {
        textDecoration: 'none',
        color: 'gray'
      }
    }

    return <div>
      { /*!this.props.appStore.isIntroBannerClosed() &&*/ <WelcomeBanner /> }
      <Divider style={{marginTop: 10}}/>
      <Paper square elevation={0}>
          <div style={{
            padding: 10,
            paddingTop: 10,
            paddingBottom: 15}}>
            <Typography variant="body1" gutterBottom>
              Staff Picks
            </Typography>
            <Typography variant="caption" gutterBottom style={{marginBottom: 10}}>
              See what you can do with a post on Nearo. This items are top picks by our staff.
            </Typography>
            <StaffPick />
          </div>
      </Paper>
      <Divider/>

      <Divider style={{marginTop: 10}}/>
      <Categories />
      <Divider/>

      <div elevation={0} style={{width: '100%', textAlign: 'center', marginTop: 10, marginBottom: 10}}>
        <Typography variant="body1" color="textSecondary">
          Nearo © 2020 <a style={style.anchor} href="/about">Privacy & Terms</a>
        </Typography>
      </div>
    </div>
  }
}

export default HomePage
