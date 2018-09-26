import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Route, Switch, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'

import Topnav from './topnav/Topnav'
import NotificationBar from './NotificationBar'
import PostsContainer from './PostsContainer'
import SinglePostContainer from './SinglePostContainer'
import PostPanel from './postpanel/PostPanel'
import Profile from './profile/Profile'
import NoMatch from './404'

@withRouter
@observer
class MainContainer extends Component {
  state = {
    bookmarks: [],
    posts: [{id: '1'}],
    nbHits: 0,
    lastDeletedPostId: null,
    maxItemPerPage: 20,
  }

  render () {
    const { classes } = this.props

    return(
      <div className={ classes.root }>
        <main className={ classes.content }>
          <div className={ classes.toolbar } />
          <Switch>
            <Route
              exact path='/'
              render={(props) =>
                <div>
                  <Topnav className={ classes.appBar } />
                  <PostsContainer />
                </div>
              }
            />
            <Route
              path='/posts/:postId'
              render={(props) =>
                <div>
                  <Topnav className={ classes.appBar } />
                  <SinglePostContainer />
                </div>
              }
            />
            <Route
              path='/newaccount'
              render={(props) =>
                <Profile mode="CREATE"/>
              }
            />
            <Route
              path='/profile'
              render={(props) =>
                <Profile />
              }
            />
            <Route component={NoMatch} />
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
