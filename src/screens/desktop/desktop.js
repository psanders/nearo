import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Loadable from 'react-loadable'
import { observer, inject } from 'mobx-react'

import ProfilePage from './profile.page'
import AboutPage from './about.page'
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
  loader: () => import('components/shared/404'),
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

  componentDidMount() {
    const pathname = this.props.routing.location.pathname
    if(pathname.includes('/amp')) {
      this.props.routing.push('/')
    }
  }

  render () {
    const { classes } = this.props
    const pathname = this.props.routing.location.pathname
    const hideNav = () => {
      return pathname === '/profile' ||
        '/' + getMainPath(pathname) === '/posts' ||
        pathname === '/post' ||
        pathname === '/about'
        ? true : false
    }

    return <div className={ classes.root }>
      <main className={ classes.content }>
        { ! hideNav() &&
          <Fragment>
            <TopNav withLocator={pathname === '/explore'}/>
            <div className={ classes.toolbar } />
          </Fragment>
        }
        { pathname === '/' && <Home /> }
        { pathname === '/explore' && <Explorer /> }
        { '/' + getMainPath(pathname) === '/posts' && <PostPage /> }
        { pathname === '/profile' && <ProfilePage /> }
        { pathname === '/login' && <LoginPage /> }
        { pathname === '/about' && <AboutPage /> }
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
    backgroundColor: '#E6E6E6'
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#E6E6E6',
  },
  toolbar: theme.mixins.toolbar,
})

export default withStyles(styles)(DesktopScreen)
