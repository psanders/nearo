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
      { !this.props.appStore.isIntroBannerClosed() && <WelcomeBanner /> }
      <Divider style={{marginTop: 10}}/>
      <Categories />
      <Divider/>

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

      <Typography style={{margin: 10}}variant="body1" gutterBottom>
        Announcements
      </Typography>

      <Divider style={{marginTop: 10}}/>
      <Paper square elevation={0} style={{
        padding: 10,
        paddingTop: 10,
        paddingBottom: 15}}>
          <Typography variant="body1" gutterBottom>
            Try Our 360 Immersive Feature
          </Typography>
          <img alt="360 view sample" onClick={() => this.props.routing.push('/posts/Ip5Di7VydameJhCS2zSS')} width="100%" src="https://firebasestorage.googleapis.com/v0/b/locally-57510.appspot.com/o/imgs%2Fimg_md_b62e2162-7234-44ce-9c34-81fec9436923.png?alt=media" />
          <Typography variant="body1" gutterBottom style={{marginBottom: 10}}>
            We are looking for real estate professionals wanting to try the
            Immersive 360 photo feature. Participants will receive this premium
            feature at no cost for the rest of the year(including photo sessions).
            Only ava nearby #Fayetteville #NC #realestate"
          </Typography>
      </Paper>

      <div elevation={0} style={{width: '100%', textAlign: 'center', marginTop: 10, marginBottom: 10}}>
        <Typography variant="body1" color="textSecondary">
          Nearo © 2018 <a style={style.anchor} href="/about">Privacy & Terms</a>
        </Typography>
      </div>
    </div>
  }
}

export default HomePage
