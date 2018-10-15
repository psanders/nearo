import React, { Component, Fragment } from 'react'
import  Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'
import Helmet from 'react-helmet-async'

import NotificationBar from '../components/NotificationBar'
import Favorites from './favorites.mobile'
import BottomNav from '../components/mobbottomnav/BottomNav'
import HomePage from './home.mobile'
import PostPage from './post.mobile'
import LocationPage from './location.mobile'
import ProfilePage from './profile.mobile'
import TopNav from '../components/mobtopnav/TopNav'
import { capitalize } from '../components/commons/utils'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
})

@inject('appStore')
@observer
class MobileScreen extends Component {

  render () {
    const { classes, appStore } = this.props

    return <Fragment>
      <Helmet>
        <title>
          Nearo
          { appStore.currentView() !== '/' ? ' - ' : ''}
          { capitalize(appStore.currentView().replace('/', '')) }
        </title>
      </Helmet>
      <TopNav />
      <div className={ classes.toolbar } />
      {
        appStore.isReady() &&
        <Fade in={true} timeout={300}>
            <div>
            { appStore.currentView() === '/' && <HomePage /> }
            { appStore.currentView() === '/posts' && <PostPage /> }
            { appStore.currentView() === '/favorites' && <Favorites /> }
            { appStore.currentView() === '/location' && <LocationPage /> }
            {
              (appStore.currentView() === '/profile' ||
              appStore.currentView() === '/login') &&
              <ProfilePage />
            }
          </div>
        </Fade>
      }
      <div className={ classes.toolbar } />
      <BottomNav />
      <NotificationBar />
    </Fragment>
  }
}

export default withStyles(styles)(MobileScreen)
