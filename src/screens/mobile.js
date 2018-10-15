import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

import NotificationBar from '../components/NotificationBar'
import Favorites from './favorites.mobile'
import BottomNav from '../components/mobbottomnav/BottomNav'
import HomePage from './home.mobile'
import PostPage from './post.mobile'
import LocationPage from './location.mobile'
import ProfilePage from './profile.mobile'
import TopNav from '../components/mobtopnav/TopNav'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
})

@inject('appStore')
@observer
class MobileScreen extends Component {
  render () {
    const { classes, appStore } = this.props

    return <Fragment>
      <TopNav />
      <div className={ classes.toolbar } />
      { appStore.currentView() === '/' && <HomePage /> }
      { appStore.currentView() === '/posts' && <PostPage /> }
      { appStore.currentView() === '/favorites' && <Favorites /> }
      { appStore.currentView() === '/location' && <LocationPage /> }
      {
        (appStore.currentView() === '/profile' ||
        appStore.currentView() === '/login') &&
        <ProfilePage />
      }
      <div className={ classes.toolbar } />
      <NotificationBar />
      <BottomNav />
    </Fragment>
  }
}

export default withStyles(styles)(MobileScreen)
