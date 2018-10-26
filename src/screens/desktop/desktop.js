import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Loadable from 'react-loadable'
import { observer, inject } from 'mobx-react'

import ProfilePage from './profile.page'
import LoginPage from './login.page'
import Notifier from 'components/shared/notifications/Notifier'
import SimpleNotification from 'components/shared/notifications/SimpleNotification'
import TopNav from 'components/desktop/topnav/TopNav'
import { getMainPath, show404 } from 'components/commons/utils'

const PostPage = Loadable({
  loader: () => import('./post.page'),
  loading: () => null,
})

const NoMatch = Loadable({
  loader: () => import('components/404'),
  loading: () => null,
})

const Home = Loadable({
  loader: () => import('components/desktop/home/Home'),
  loading: () => null,
})

const Explorer = Loadable({
  loader: () => import('components/desktop/explorer/Explorer'),
  loading: () => null,
})

@inject('routing')
@observer
class DesktopScreen extends Component {

  render () {
    const { classes } = this.props
    const pathname = this.props.routing.location.pathname
    const hideNav = () => {
      return pathname === '/profile' ||
        '/' + getMainPath(pathname) === '/posts' ||
        pathname === '/post'
        ? true : false
    }

    return <div className={ classes.root }>
      <main className={ classes.content }>
        { ! hideNav() &&
          <Fragment>
            <TopNav />
            <div className={ classes.toolbar } />
          </Fragment>
        }
        { pathname === '/' && <Home /> }
        { pathname === '/explore' && <Explorer /> }
        { '/' + getMainPath(pathname) === '/posts' && <PostPage /> }
        { pathname === '/profile' && <ProfilePage /> }
        { pathname === '/login' && <LoginPage /> }
        { show404(pathname) && <NoMatch /> }
      </main>
      <Notifier widthWith={350} withOrigin={{vertical: 'top', horizontal: 'right'}}/>
      <SimpleNotification />
    </div>
  }
}

DesktopScreen.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    backgroundColor: '#dae0e6'
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#dae0e6',
  },
  toolbar: theme.mixins.toolbar,
})

export default withStyles(styles)(DesktopScreen)
