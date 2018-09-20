import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Route, Switch, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'

import { bookmarksStore } from './stores/bookmarks'
import { usersStore } from './stores/users'
import { postsStore } from './stores/posts'
import { navStore } from './stores/navigation'
import { notificationsStore } from './stores/notifications'
import Topnav from './topnav/Topnav'
import NotificationBar from './NotificationBar'
import ProfileDialog from './profile/ProfileDialog'
import PostsContainer from './PostsContainer'
import SinglePostContainer from './SinglePostContainer'
import PostPanel from './postpanel/PostPanel'

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

    const NoMatch = ({ location }) => (
      <div style={{margin: 20}}>
        <h3>Ups! No match was found for <code>{location.pathname}</code></h3>
      </div>
    )

    return(
      <div className={ classes.root }>
        <Topnav
          usersStore={ usersStore }
          postsStore={ postsStore }
          navStore={ navStore }
          className={ classes.appBar } />

        <main className={ classes.content }>
          <div className={ classes.toolbar } />
          <Switch>
            <Route
              exact path='/'
              render={(props) =>
                <PostsContainer
                  postsStore={ postsStore }
                  navStore={ navStore }
                  usersStore={ usersStore }
                  bookmarksStore={ bookmarksStore }
                  notificationsStore={ notificationsStore }
                />
              }
            />
            <Route
              path='/posts/:postId'
              render={(props) =>
                <SinglePostContainer
                  usersStore={ usersStore }
                  postsStore={ postsStore }
                  bookmarksStore={ bookmarksStore }
                  notificationsStore={ notificationsStore }/>
              }
            />
            <Route component={NoMatch} />
          </Switch>
        </main>
        <NotificationBar notificationsStore={ notificationsStore }/>
        <PostPanel
          notificationsStore={ notificationsStore }
          postsStore={ postsStore }
          navStore={ navStore }
          usersStore={ usersStore }
        />
        { usersStore.currentUser &&
          usersStore.currentUser.isNewUser &&
          <ProfileDialog usersStore={usersStore} notificationsStore={notificationsStore} />
        }
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
