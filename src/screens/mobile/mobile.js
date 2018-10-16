import React, { Component, Fragment } from 'react'
import  Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'
import Helmet from 'react-helmet-async'

import BottomNav from '../../components/mobbottomnav/BottomNav'
import TopNav from '../../components/mobtopnav/TopNav'
import { capitalize } from '../../components/commons/utils'
import Favorites from './favorites.page'
import HomePage from './home.page'
import PostPage from './post.page'
import LocationPage from './location.page'
import ProfilePage from './profile.page'

@inject('appStore')
@observer
class MobileScreen extends Component {

  render () {
    const { classes, appStore } = this.props

    return <Fragment>
      { appStore.currentView() !== '/profile' && <TopNav /> }
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
      { appStore.currentView() !== '/profile' && <BottomNav /> }
    </Fragment>
  }
}

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
})

export default withStyles(styles)(MobileScreen)
