import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Loadable from 'react-loadable'
import { observer, inject } from 'mobx-react'

import NotificationBar from '../../components/NotificationBar'
import TopNav from '../../components/topnav/TopNav'
import ProfilePage from './profile.page'
import LoginPage from './login.page'
import { getMainPath } from '../../components/commons/utils'

const loading = <Typography variant="body1" color="secondary" style={{ margin: 20 }}>
  Loading...
</Typography>

const PostPage = Loadable({
  loader: () => import('./post.page'),
  loading: () => loading,
})

const NoMatch = Loadable({
  loader: () => import('../../components/404'),
  loading: () => loading,
})

const Home = Loadable({
  loader: () => import('../../components/home/Home'),
  loading: () => loading,
})

const PostsContainer = Loadable({
  loader: () => import('../../components/PostsContainer'),
  loading: () => loading,
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
        { pathname === '/explore' && <PostsContainer /> }
        { '/' + getMainPath(pathname) === '/posts' && <PostPage /> }
        { pathname === '/profile' && <ProfilePage /> }
        { pathname === '/login' && <LoginPage /> }
        { pathname === null && <NoMatch /> }
      </main>
      <NotificationBar />
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
