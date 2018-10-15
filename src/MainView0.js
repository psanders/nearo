import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Helmet from 'react-helmet-async'
import Typography from '@material-ui/core/Typography'
import Loadable from 'react-loadable'

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

class MainContainer extends Component {
  render () {
    const { classes } = this.props

    const scrollTop = () => {
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    }

    return(
      <div>
        <Hidden xsDown={true}>
          <div className={ classes.root }>
            <main className={ classes.content }>
              <Topnav className={ classes.appBar } />
              <div className={ classes.toolbar } />

              <BrowserRouter>
                <Switch>
                  <Route
                    exact path='/'
                    render={(props) => {
                      scrollTop()
                      return <div>
                        <Helmet>
                          <title>Nearo</title>
                        </Helmet>

                        <Hidden mdUp={true}><PostsContainer/></Hidden>
                        <Hidden smDown={true}><Home /></Hidden>
                      </div>
                    }}
                  />
                  <Route
                    exact path='/explore'
                    render={(props) => {
                      scrollTop()
                      return <div>
                        <Helmet>
                          <title>Nearo - Explore</title>
                        </Helmet>
                        <Topnav className={ classes.appBar } />
                        <PostsContainer />
                      </div>
                    }}
                  />
                  <Route
                    path='/posts/:postId'
                    render={(props) => {
                      scrollTop()
                      return <div>
                        <Topnav className={ classes.appBar } />
                        <PostView />
                      </div>
                    }}
                  />
                  <Route
                    path='/login'
                    render={(props) => {
                      scrollTop()
                      return <LoginScreen />
                    }}
                  />
                  <Route
                    path='/profile'
                    render={(props) => {
                      scrollTop()
                      return <div>
                        <Profile />
                      </div>
                  }}
                  />
                  <Route render={ props =>  <NoMatch /> } />
                </Switch>
              </BrowserRouter>
            </main>
            <NotificationBar />
          </div>
        </Hidden>
        <Hidden smUp={true}>
          <MobileScreen />
        </Hidden>
      </div>
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
