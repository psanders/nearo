import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

import NotificationBar from '../components/NotificationBar'
import Favorites from './favorites.mobile'
import BottomNav from '../components/mobbottomnav/BottomNav'
import HomePage from './home.mobile'
import PostPage from './post.mobile'
import TopNav from '../components/mobtopnav/TopNav'
import Profile from './profile.mobile'

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
      { this.props.appStore.currentView === '/post' && <PostPage /> }
      { this.props.appStore.currentView === '/favorites' && <Favorites /> }
      {
        (this.props.appStore.currentView === '/profile' ||
        this.props.appStore.currentView === '/login') &&
        <Profile />
      }
      <BottomNav />
      <NotificationBar />
    </Fragment>
  }
}

export default withStyles(styles)(MobileScreen)
