import React, { Component, Fragment } from 'react'
import  Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import NotificationBar from '../../components/NotificationBar'
import BottomNav from '../../components/mobbottomnav/BottomNav'
import TopNav from '../../components/mobtopnav/TopNav'
import FavoritesPage from './favorites.page'
import HomePage from './home.page'
import PostPage from './post.page'
import LocationPage from './location.page'
import ProfilePage from './profile.page'
import LoginPage from './login.page'
import { getMainPath } from '../../components/commons/utils'

@inject('routing')
@inject('appStore')
@inject('postsStore')
@observer
class MobileScreen extends Component {

  render () {
    const { classes, appStore } = this.props
    const pathname = this.props.routing.location.pathname
    const hideNav = () => {
      return pathname === '/profile' ||
        pathname === '/login' ? true : false
    }

    console.log('pathname', getMainPath(pathname))

    return <Fragment>
      { ! hideNav() &&
        <Fragment>
          <TopNav />
          <div className={ classes.toolbar } />
        </Fragment>
      }
      {
        appStore.isReady() &&
        <Fade in={true} timeout={300}>
          <div>
            { pathname === '/' && <HomePage /> }
            {  pathname === '/explore' || pathname === '/' && <HomePage /> }
            { '/' + getMainPath(pathname) === '/posts' && <PostPage /> }
            { pathname === '/favorites' && <FavoritesPage /> }
            { pathname === '/location' && <LocationPage /> }
            { pathname === '/profile' && <ProfilePage /> }
            { pathname === '/login' && <LoginPage /> }
          </div>
        </Fade>
      }
      {
        ! hideNav() &&
        <Fragment>
          <div className={ classes.toolbar } />
          <BottomNav />
        </Fragment>
      }
      <NotificationBar withExtraSpacing/>
    </Fragment>
  }
}

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
})

export default withStyles(styles)(MobileScreen)
