import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import StaffPick from 'components/mobile/staffpick/StaffPick'
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
      <Paper square elevation={0} style={{
        marginTop: 10,
        padding: 5,
        paddingTop: 20,
        paddingBottom: 20}}>
        <Typography variant="body2" gutterBottom>
          Staff Pick
        </Typography>
        <StaffPick />
      </Paper>

      <Paper square elevation={0} style={{
        marginTop: 10,
        padding: 5,
        paddingTop: 20,
        paddingBottom: 20}}>
        <Typography variant="caption" gutterBottom>
          Begin to explore Nearo
        </Typography>
      </Paper>

      <Paper square elevation={0} style={{
        marginTop: 10,
        padding: 5,
        paddingTop: 20,
        paddingBottom: 20}}>
        <Typography variant="caption" gutterBottom>
          Begin to explore Nearo
        </Typography>
        <Button style={{width: '100%'}} variant="outlined" color="primary">
          Explore
        </Button>
      </Paper>
    </div>
  }
}

export default HomePage
