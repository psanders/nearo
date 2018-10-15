import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

import TopNav from '../components/mobtopnav/TopNav'
import NotificationBar from '../components/NotificationBar'
import BottomNav from '../components/mobbottomnav/BottomNav'
import HomePage from './home.mobile'
import Profile from './profile.mobile'
import Favorites from './favorites.mobile'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
})

@inject('appStore')
@observer
class MobileScreen extends Component {
  render () {
    const { classes } = this.props

    return <Fragment>
      <TopNav />
      <div className={ classes.toolbar } />
      { this.props.appStore.currentView === '/' && <HomePage /> }
      { this.props.appStore.currentView === '/favorites' && <Favorites /> }
      { this.props.appStore.currentView === '/profile' && <Profile /> }
      <BottomNav />
      <NotificationBar />
    </Fragment>
  }
}

export default withStyles(styles)(MobileScreen)
