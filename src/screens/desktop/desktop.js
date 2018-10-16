import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Loadable from 'react-loadable'
import { observer, inject } from 'mobx-react'

import TopNav from '../../components/topnav/TopNav'
import ProfilePage from './profile.page'
import LoginPage from './login.page'

const loading = <Typography variant="body1" color="secondary" style={{ margin: 20 }}>
  Loading...
</Typography>

const PostView = Loadable({
  loader: () => import('../../components/postview/PostView'),
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

@inject('appStore')
@observer
class DesktopScreen extends Component {

  render () {
    const { classes, appStore } = this.props
    const hideNav = () => {
      return appStore.currentView() === '/profile' ||
        appStore.currentView() === '/login' ? true : false
    }

    return <div className={ classes.root }>
      <main className={ classes.content }>
        { ! hideNav() &&
          <Fragment>
            <TopNav />
            <div className={ classes.toolbar } />
          </Fragment>
        }
        { appStore.currentView() === '/' && <Home /> }
        { appStore.currentView() === '/explore' && <PostsContainer /> }
        { appStore.currentView() === '/posts' && <PostView /> }
        { appStore.currentView() === '/profile' && <ProfilePage /> }
        { appStore.currentView() === '/login' && <LoginPage /> }
        { appStore.currentView() === null && <NoMatch /> }
      </main>
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
