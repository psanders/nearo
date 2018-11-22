import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Helmet from 'react-helmet-async'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

import { placeHolder } from './PlaceHolder'
import { styles } from './PostViewStyles'
import { db } from 'components/commons/firebase/firebase'
import { currentPath } from 'components/commons/utils'
import PostActions from 'components/shared/postactions/PostActions'
import MapCard from 'components/shared/map/MapCard'
import Media from 'components/mobile/postview/Media'
import PostDetails from 'components/mobile/postview/PostDetails'
import Caption from 'components/mobile/postcard/Caption'
import Author from 'components/mobile/postview/Author'

@inject('usersStore')
@inject('postsStore')
@inject('bookmarksStore')
@inject('notificationsStore')
@observer
class PostView extends Component {
  state = {
    post: {},
    user: {}
  }

  componentDidMount () {
    const currentPost = this.props.postsStore.currentPost
    if (!currentPost) {
      this.loadFromDB()
      return
    }
    this.loadUser(currentPost)
  }

  loadFromDB () {
    const postRef = db.collection('posts').doc(currentPath(2))
    postRef.get()
    .then(result => {
      if (result.exists && !result.data().deleted) {
        const post = result.data()
        post.id = result.id
        this.loadUser(post)
      } else {
        // throw 404
      }
    }).catch(error => {
      console.error('Unable to fetch post information', error)
    })
  }

  loadUser = post => {
    const userRef = db.collection('users').doc(post.userId)
    userRef.get()
    .then(user => {
      if (user.exists) {
        // Load post and user here to avoid doble loading
        this.setState({user: user.data()})
        this.setState({post: post})
      }
    }).catch(error => {
      console.error('Unable to fetch user information', error)
    })
  }

  handleSold = (post) => this.setState({post: post})

  render() {
    const { classes } = this.props
    const { post, user } = this.state

    return (
      <Fragment>
        <Helmet>
          { post.title && <title>{post.title} near {post.locText} | Nearo</title> }
        </Helmet>
        <Paper square elevation={0} style={{minHeight: '100vh'}}>
          <div style={{padding: 10, paddingBottom: 0}}>
            <Typography component="h1" variant="subtitle2" >
              { post.title }
              { post.category === 'forsale' &&
                post.price !== 0 &&
                <span className={classes.price}>
                  {"$" + post.price }
                </span>
              }
            </Typography>
            { post.id && <Caption post={post} /> }
          </div>
          <div style={{padding: 10, paddingBottom: 0}}>
            { post.id ? <Media post={post} />: placeHolder() }
          </div>
          <div style={{padding: 10, paddingBottom: 0}}>
            { post.id && <PostActions post={post}/> }
          </div>
          <div style={{padding: 10, paddingBottom: 0}}>
            { post.id && <PostDetails post={ post } classes={ classes }/> }
          </div>
          <div style={{padding: 10}}>
            <Divider />
          </div>
          <div style={{padding: 10}}>
            { user && <Author user={ user }/> }
          </div>
          <div style={{padding: 10, paddingBottom: 0}}>
            <Divider />
          </div>
          <div style={{padding: 10}}>
            <Typography variant="caption" gutterBottom>
              Aproximate Location
            </Typography>
            <MapCard height={150} center={ post._geoloc }/>
          </div>
        </Paper>
      </Fragment>
    )
  }
}

PostView.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostView)
