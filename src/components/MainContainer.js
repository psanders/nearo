import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import { Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import { postsStore } from '../stores/posts'

import BottomNav from './bottomnav/BottomNav'
import Topnav from './topnav/Topnav'
import NotificationBar from './NotificationBar'
import ProfileDialog from './profile/ProfileDialog'
import { auth, db } from './commons/firebase/firebase'
import { doSearchAlgolia } from './commons/firebase/algolia'
import { storeUserInfo, fetchUserInfo, removeUserInfo } from './commons/dbfunctions'
import PostsContainer from './PostsContainer'
import SinglePostContainer from './SinglePostContainer'
import { openURL } from './commons/utils'

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
    //padding: theme.spacing.unit * 2,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
})

@observer
class MainContainer extends React.Component {
  state = {
    bookmarks: [],
    posts: [{id: '1'}],
    nbHits: 0,
    notificationWithUndo: false,
    notificationBarOpen: false,
    notificationBarMessage: '',
    notificationUndo: null,
    lastDeletedPostId: null,
    maxItemPerPage: 20,
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = db.collection('users').doc(user.email)
        userRef.get()
        .then(result => {
          storeUserInfo('user-info', result.data())
          this.setState({user: result.data()})
          this.updateBookmarks(result.data())
        })
      } else {
        this.setState({user: null})
        removeUserInfo('user-info')
        this.updateBySearch({searchTerm: ''})
      }
    })

    fetchUserInfo('user-info').then(user => {
      this.setState({user: user})
    })

    fetchUserInfo('topnav-locator').then(navInfo => {
      this.setState({navInfo: navInfo})
    })

    fetchUserInfo('bookmarks').then(bookmarks => {
      this.setState({bookmarks: bookmarks})
      this.updateBySearch({searchTerm: ''})
    })
  }

  updateBySearch = (navInfo, offset = 0) => {
    let query = {
      query: navInfo.searchTerm,
      offset: offset,
      length: this.state.maxItemPerPage
    }

    if (navInfo.locInfo && navInfo.locInfo.latLng) {
      query.aroundLatLng = navInfo.locInfo.latLng.lat + ","
        + navInfo.locInfo.latLng.lng
      query.minimumAroundRadius = 20000
    }

    doSearchAlgolia(query, (results, nbHits) => {
      this.updatePosts(results, offset)
      this.setState({nbHits: nbHits})
    })
  }

  showMoreResults = () => this.updateBySearch(this.state.navInfo, this.state.posts.length)

  handleOnNavChange = navInfo => {
    this.updateBySearch(navInfo)
    this.setState({navInfo: navInfo})

    if(this.getCurrentPathname()) {
      openURL("/")
    }
  }

  getCurrentPathname = () => window.location.pathname.split('/')[2]

  updatePosts = (posts, doConcact) => {
    if (!posts) return

    const bookmarks = this.state.user? this.state.bookmarks : []
    posts.forEach(post => {
      bookmarks.forEach(x => {
        if(x === post.id) {
          post.bookmarked = true
        }
      })
    })
    if(doConcact) {
      posts = this.state.posts.concat(posts)
    }
    this.setState({posts: posts})

    postsStore.setData(posts)
  }

  addNewPost = post => {
    const posts = this.state.posts
    posts.unshift(post)
    this.setState({posts: posts})
  }

  updateBookmarks = user => {
    const bookmarks = []
    db.collection("bookmarks")
    .where("user", "==", user.email)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
          bookmarks.push(doc.id)
      })
      storeUserInfo('bookmarks', bookmarks)
    })
  }

  handleBookmark = () => this.updateBookmarks(this.state.user)

  handleNotify = (message, undo) => {
    if (undo) {
      this.setState({notificationWithUndo: true})
    } else {
      this.setState({notificationWithUndo: false})
    }
    this.setState({ notificationBarOpen: true, notificationBarMessage: message, undo: undo })
  }

  removePostFromArray = postId => {
    const posts = this.state.posts.filter(post => post.id !== postId)
    // I do this to prevent the "show more button" from showing up
    this.setState({nbHits: (this.state.nbHits - 1)})
    this.setState({posts: posts})
  }

  getPost = postId => this.state.posts.filter(post => post.id === postId)[0]

  handlePostDelete = (post) => {
    this.setState({deletedPost: this.getPost(post.id)})
    const postRef = db.collection('posts').doc(post.id)
    postRef.set({
      deleted: true,
      deletedTimestamp: Date.now()
    }, { merge: true }).then(() => {
      this.removePostFromArray(post.id)
      this.handleNotify("Post deleted", this.handleUndeletePost)
    }).catch((error) => {
      console.log(error)
      this.handleNotify("Something when wrong. Please try again later")
    })
  }

  handleUndeletePost = () => {
    const postRef = db.collection('posts').doc(this.state.deletedPost.id)
    postRef.set({
      deleted: false,
      deletedTimestamp: Date.now()
    }, { merge: true }).then(() => {
      const posts = this.state.posts
      const deletedPost = this.state.deletedPost
      deletedPost.deleted = false
      posts.push(deletedPost)
      this.setState({posts: posts})
    })
    this.setState({ notificationBarOpen: false })
  }

  markSold = (post) => {
    const postRef = db.collection('posts').doc(post.id)
    const sold = !post.sold ? true : false

    // Update post
    post.sold = sold
    this.setState({post: post})

    postRef.set({
       sold: !sold
    }, { merge: true }).then(() => {
      if(sold) {
        this.handleNotify('Post marked as sold')
      } else {
        this.handleNotify('Post marked as unsold')
      }
    }).catch(error => {
      post.sold = !sold
      this.setState({post: post})
      console.error("Error writing document: ", error)
    })
  }

  render () {
    const { classes } = this.props
    const { user } = this.state

    return(
      <div className={ classes.root }>
        <Topnav
          onChange={ this.handleOnNavChange }
          user={user}
          className={ classes.appBar } />
        <main className={ classes.content }>
          <Route
            exact path='/'>
            <div className={ classes.toolbar } />
          </Route>
          <Route
            exact path='/'
            render={(props) =>
              <PostsContainer user={ user }
                posts={this.state.posts}
                onNewPost={ this.addNewPost }
                onBookmark={ this.handleBookmark }
                onDelete={ this.handlePostDelete }
                onMarkSold = { this.markSold }
                onNotification={ this.handleNotify }
                onShowMoreResult={ this.showMoreResults }
                nbHits={ this.state.nbHits }
              />
            }
          />
          <Route
            exact
            path='/posts/:postId'
            render={(props) =>
              <SinglePostContainer user={ user }
                classes={ classes }
                post={ this.getPost(this.getCurrentPathname()) }
                onNewPost={ this.addNewPost }
                onBookmark={ this.handleBookmark }
                onDelete={ this.handlePostDelete }
                onNotification={ this.handleNotify }
                onShowMoreResult={ this.showMoreResults }
                nbHits={ this.state.nbHits }
                />
            }
          />
        </main>
        <Hidden smUp={true}>
          <BottomNav />
        </Hidden>
        <NotificationBar
          message={ this.state.notificationBarMessage }
          open={ this.state.notificationBarOpen}
          showUndo={this.state.notificationWithUndo}
          handleUndo={this.handleUndeletePost}
          handleClose = { e => this.setState({ notificationBarOpen: false })} />
          {user && user.isNewUser && <ProfileDialog onNotification={this.handleNotify} open={true} user={ user } /> }
      </div>
    )
  }
}

MainContainer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainContainer)
