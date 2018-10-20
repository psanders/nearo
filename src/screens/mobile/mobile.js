import React, { Component, Fragment } from 'react'
import  Fade from '@material-ui/core/Fade'
import Loadable from 'react-loadable'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

import BottomNav from '../../components/mobbottomnav/BottomNav'
import TopNav from '../../components/mobtopnav/TopNav'
import { getMainPath } from '../../components/commons/utils'

const HomePage = Loadable({ loader: () => import('./home.page'), loading: () => null})
const PostPage = Loadable({ loader: () => import('./post.page'), loading: () => null})
const LocationPage = Loadable({ loader: () => import('./location.page'), loading: () => null})
const ProfilePage = Loadable({ loader: () => import('./profile.page'), loading: () => null})
const FavoritesPage = Loadable({ loader: () => import('./favorites.page'), loading: () => null})
const LoginPage = Loadable({ loader: () => import('./login.page'), loading: () => null})
const NotificationBar = Loadable({ loader: () => import('../../components/NotificationBar'), loading: () => null})

@inject('routing')
@inject('appStore')
@inject('postsStore')
@observer
class MobileScreen extends Component {

  render () {
    const { classes, appStore } = this.props
    const pathname = this.props.routing.location.pathname
    const hideNav = () => pathname === '/profile' || pathname === '/login'

    return <Fragment>
      { ! hideNav() && <TopNav /> }
      {
        appStore.isReady() &&
        <Fade in={true} timeout={300}>
          <div>
            { pathname === '/' && <HomePage /> }
            { (pathname === '/explore' || pathname === '/') && <HomePage /> }
            { ('/' + getMainPath(pathname) === '/posts') && <PostPage /> }
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
