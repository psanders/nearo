import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Route, Switch, withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import Home from './home/Home'
import Topnav from './topnav/Topnav'
import NotificationBar from './NotificationBar'
import PostsContainer from './PostsContainer'
import SinglePostContainer from './SinglePostContainer'
import PostPanel from './postpanel/PostPanel'
import LoginScreen from './profile/LoginScreen'
import Profile from './profile/Profile'
import NoMatch from './404'

@inject('postsStore')
@inject('navStore')
@inject('usersStore')
@inject('bookmarksStore')
@inject('notificationsStore')
@withRouter
@observer
class MainContainer extends Component {
  render () {
    const { classes } = this.props

    const scrollTop = () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    return(
      <div className={ classes.root }>
        <main className={ classes.content }>
          <Switch>
            <Route
              exact path='/'
              render={(props) => {
                scrollTop()
                return <div>
                  <div className={ classes.toolbar } />
                  <Home />
                </div>
              }}
            />
            <Route
              exact path='/explore'
              render={(props) => {
                scrollTop()
                return <div>
                  <div className={ classes.toolbar } />
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
                  <div className={ classes.toolbar } />
                  <Topnav className={ classes.appBar } />
                  <SinglePostContainer />
                </div>
              }}
            />
            <Route
              path='/login'
              render={(props) => {
                scrollTop()

                return <div>
                  <div className={ classes.toolbar } />
                  <LoginScreen />
                </div>
              }}
            />
            <Route
              path='/profile'
              render={(props) => {
                scrollTop()
                return <div>
                  <div className={ classes.toolbar } />
                  <Profile />
                </div>
            }}
            />
            <Route render={ (props) => {
              return <div>
                <div className={ classes.toolbar } />
                <NoMatch />
              </div>
            }}
            />
          </Switch>
        </main>
        <NotificationBar />
        <PostPanel />
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
