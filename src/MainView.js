import React, { Component, Fragment} from 'react'
import Hidden from '@material-ui/core/Hidden'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Loadable from 'react-loadable'
import { observer, inject } from 'mobx-react'

import Topnav from './components/topnav/Topnav'
import NotificationBar from './components/NotificationBar'
import MobileScreen from './screens/mobile'

const loading = <Typography variant="body1" color="secondary" style={{margin: 20}}>Loading...</Typography>

const Profile = Loadable({
  loader: () => import('./components/profile/Profile'),
  loading: () => loading,
})

const LoginScreen = Loadable({
  loader: () => import('./components/profile/LoginScreen'),
  loading: () => loading,
})

const PostView = Loadable({
  loader: () => import('./components/postview/PostView'),
  loading: () => loading,
})

const NoMatch = Loadable({
  loader: () => import('./components/404'),
  loading: () => loading,
})

const Home = Loadable({
  loader: () => import('./components/home/Home'),
  loading: () => loading,
})

const PostsContainer = Loadable({
  loader: () => import('./components/PostsContainer'),
  loading: () => loading,
})

@inject('appStore')
@observer
class MainContainer extends Component {
  render () {
    const { classes, appStore } = this.props

    const scrollTop = () => {
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    }

    return(
      <Fragment>
        <Hidden xsDown={true}>
          <div className={ classes.root }>
            <main className={ classes.content }>
              <div className={ classes.toolbar } />
              <Topnav className={ classes.appBar } />
              { appStore.currentView() === '/' && <Home /> }
              { appStore.currentView() === '/explore' && <PostsContainer /> }
              { appStore.currentView() === '/posts' && <PostView /> }
              { appStore.currentView() === '/profile' && <Profile /> }
              { appStore.currentView() === null && <NoMatch /> }
            </main>
          </div>
        </Hidden>
        <Hidden smUp={true}>
          <MobileScreen />
        </Hidden>
        <NotificationBar />
      </Fragment>
    )
  }
}

MainContainer.propTypes = {
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
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#dae0e6',
  },
  toolbar: theme.mixins.toolbar,
})

export default withStyles(styles)(MainContainer)
