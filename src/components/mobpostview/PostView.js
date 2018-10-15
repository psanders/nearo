import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { observer, inject } from 'mobx-react'
import Helmet from 'react-helmet-async'

import PostActions from '../postcard/PostActions'
import MapCard from '../map/MapCard'
import ProfileCard from '../profile/ProfileCard'
import About from '../About'
import { db } from '../commons/firebase/firebase'
import { capitalize } from '../commons/utils'
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
    const postRef = db.collection('posts').doc(this.props.postsStore.currentPost.id)
    this.setState({post: this.props.postsStore.currentPost})
    /*postRef.get()
    .then(result => {
      if (result.exists && !result.data().deleted) {
        this.loadUser(result)
      } else {
        // throw 404
      }
    }).catch(error => {
      console.error('Unable to fetch post information', error)
    })*/
  }

  loadUser = postInfo => {
    const post = postInfo.data()
    post.id = postInfo.id
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
      <Hidden xsDown={true}>
        <ProfileCard user={ user } gutterBottom={16}/>
        <MapCard center={ post._geoloc } gutterBottom={16}/>
        { post._geoloc && <About gutterBottom={16}/> }
      </Hidden>
      <Hidden smUp={true}>
        <ProfileCard user={ user } gutterBottom={3} />
        <MapCard center={ post._geoloc } gutterBottom={3}/>
        {/* A bit of a hack...*/}
        { post._geoloc && <About gutterBottom={0.9}/> }
      </Hidden>
    </Fragment>

    return (
      <Fragment>
        <Helmet>
          <title>Nearo - { capitalize(post.category) }</title>
        </Helmet>
        <Hidden xsDown={true}>
          <div className={classes.top20} />
        </Hidden>
        <Grid
          container
          direction="row"
          justify="center"

          >
            <Grid item sm={10} md={5} xs={12} >
              <Grid item>
                { leftColumn(post, classes) }
              </Grid>
              <Hidden smUp={true}>
                <div style={{marginTop: 3}} />
                { rightColumn(post) }
              </Hidden>
            </Grid>
            <Hidden xsDown={true}>
              <Grid item sm={10} md={3} xs={12}>
                { rightColumn(post) }
                <br />
              </Grid>
            </Hidden>
        </Grid>
        <Hidden mdDown={true}>
          <div className={classes.top20} />
        </Hidden>
      </Fragment>
    )
  }
}

PostView.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostView)
