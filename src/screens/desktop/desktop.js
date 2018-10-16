import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Loadable from 'react-loadable'
import { observer, inject } from 'mobx-react'

import Topnav from '../../components/topnav/Topnav'
import ProfilePage from './profile.page'

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

    return <Fragment>
      <div className={ classes.root }>
        <main className={ classes.content }>
          { appStore.currentView() !== '/profile' && <Topnav /> }
          <div className={ classes.toolbar } />
          { appStore.currentView() === '/' && <Home /> }
          { appStore.currentView() === '/explore' && <PostsContainer /> }
          { appStore.currentView() === '/posts' && <PostView /> }
          {
            (appStore.currentView() === '/profile' ||
            appStore.currentView() === '/login') &&
            <ProfilePage />
          }
          { appStore.currentView() === null && <NoMatch /> }
        </main>
      </div>
    </Fragment>
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
