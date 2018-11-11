import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { observer, inject } from 'mobx-react'
import Helmet from 'react-helmet-async'

import PostActions from 'components/shared/postactions/PostActions'
import MapCard from 'components/shared/map/MapCard'
import ProfileCard from 'components/shared/profilecard/ProfileCard'
import About from 'components/shared/About'
import { db } from 'components/commons/firebase/firebase'
import { currentPath, scrollTop } from 'components/commons/utils'
import { placeHolder } from './PlaceHolder'
import { postContent } from './PostContent'
import { styles } from './PostViewStyles'

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
    scrollTop()
    const { classes, gutterBottom } = this.props
    const { post, user } = this.state

    const leftColumn = (post, classes) => {
      return <div className={classes.leftColumn}>
        { post.id ? postContent(post, classes, gutterBottom) : placeHolder() }
        {
          post.id &&
          <div className={classes.postActions}>
            <PostActions post={ this.state.post }
              url={ "https://nearo.co/posts/" + post.id }
            />
          </div>
        }
      </div>
    }

    const rightColumn = post => <Fragment>
      <ProfileCard user={ user } gutterBottom={16}/>
      <div style={{marginBottom: 15}}>
        <MapCard center={ post._geoloc } />
      </div>
      { post._geoloc && <About gutterBottom={16}/> }
    </Fragment>

    return (
      <Fragment>
        <Helmet>
          { post.title && <title>{post.title} near {post.locText} | Nearo</title> }
        </Helmet>
        <div className={classes.top20} />
        <Grid
          container
          direction="row"
          justify="center"
          spacing={16}
          >
            <Grid item sm={10} md={5} xs={12} >
              <Grid item>
                { leftColumn(post, classes) }
              </Grid>
            </Grid>
            <Grid item sm={10} md={3} xs={12}>
              { rightColumn(post) }
            </Grid>
        </Grid>
        <div className={classes.top20} />
      </Fragment>
    )
  }
}

PostView.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostView)
