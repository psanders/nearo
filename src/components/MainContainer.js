import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Route } from 'react-router-dom'
import { observer } from 'mobx-react'

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
        <Topnav
          usersStore={ usersStore }
          postsStore={ postsStore }
          className={ classes.appBar } />
        <main className={ classes.content }>
          <Route
            exact path='/'>
            <div className={ classes.toolbar } />
          </Route>
          <Route
            exact path='/'
            render={(props) =>
              <PostsContainer
                postsStore={ postsStore }
                navStore={ navStore }
              />
            }
          />
          <Route
            exact
            path='/posts/:postId'
            render={(props) =>
              <SinglePostContainer />
            }
          />
        </main>
        <NotificationBar notificationsStore={ notificationsStore }/>
        <PostPanel
          notificationsStore={ notificationsStore }
          postsStore={ postsStore }
          navStore={ navStore }
          usersStore={ usersStore }
        />
        {
          usersStore.currentUser &&
          usersStore.currentUser.isNewUser &&
          <ProfileDialog usersStore={ usersStore } notificationsStore={ notificationsStore }/>
        }
      </div>
    )
  }
}

MainContainer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainContainer)
