import React, { Component, Fragment } from 'react'
import Collapse from '@material-ui/core/Collapse'
import Loadable from 'react-loadable'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

import SimpleNotification from '../../components/shared/notifications/SimpleNotification'
import Notifier from '../../components/shared/notifications/Notifier'
import BottomNav from '../../components/mobile/bottomnav/BottomNav'
import TopNav from '../../components/mobile/topnav/TopNav'
import { getMainPath, show404 } from '../../components/commons/utils'

const NothingPage = Loadable({ loader: () => import('./nothing.page'), loading: () => null})
const HomePage = Loadable({ loader: () => import('./home.page'), loading: () => null})
const PostPage = Loadable({ loader: () => import('./post.page'), loading: () => null})
const LocationPage = Loadable({ loader: () => import('./location.page'), loading: () => null})
const ProfilePage = Loadable({ loader: () => import('./profile.page'), loading: () => null})
const FavoritesPage = Loadable({ loader: () => import('./favorites.page'), loading: () => null})
const LoginPage = Loadable({ loader: () => import('./login.page'), loading: () => null})

@inject('routing')
@inject('appStore')
@inject('postsStore')
@observer
class MobileScreen extends Component {

  render () {
    const { classes, appStore } = this.props
    const pathname = this.props.routing.location.pathname
    const hideNav = pathname => pathname === '/profile' || pathname === '/login'

    return <Fragment>
      { ! hideNav(pathname) &&
        <Fragment>
          <div className={ classes.toolbar } />
          <TopNav />
        </Fragment>
      }
      {
        <Collapse in={appStore.isReady()}>
          <div>
            { pathname === '/' && <HomePage /> }
            { (pathname === '/explore' || pathname === '/') && <HomePage /> }
            { ('/' + getMainPath(pathname) === '/posts') && <PostPage /> }
            { pathname === '/favorites' && <FavoritesPage /> }
            { pathname === '/location' && <LocationPage /> }
            { pathname === '/profile' && <ProfilePage /> }
            { pathname === '/login' && <LoginPage /> }
            { show404(pathname) && <NothingPage /> }
          </div>
        </Collapse>
      }
      {
        ! hideNav(pathname) &&
        <Fragment>
          <div className={ classes.toolbar } />
          <BottomNav />
        </Fragment>
      }
      <Notifier />
      <SimpleNotification withExtraSpacing />
    </Fragment>
  }
}

const styles = theme => ({ toolbar: theme.mixins.toolbar })

export default withStyles(styles)(MobileScreen)
