import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import CardMedia from '@material-ui/core/CardMedia'
import Moment from 'react-moment'
import LinkIcon from '@material-ui/icons/Link'
import { styles } from './PostCardStyles'
import { observer } from 'mobx-react'

import { notificationsStore } from '../stores/notifications'
import { db } from '../commons/firebase/firebase'
import { getCategory } from '../commons/categories'
import PostActions from './PostActions'

@observer
class PostCard extends React.Component {
  state = {
    post: this.props.post
  }

  addBookmark = () => {
    if (!this.isSignedIn()) {
      notificationsStore.showNotification('You must login to like a post')
      return
    }
    // Update UI before it actually happend
    this.uiRefreshForBookmark()
    const bookmarksRef = db.collection('bookmarks').doc(this.state.post.id)
    bookmarksRef.set({
      user: this.props.user.email
    }, { merge: true }).then(() => {
      notificationsStore.showNotification('Noted!')
      this.props.onBookmark()
    }).catch(function(error) {
      // Rollback if something happen
      this.uiRefreshForBookmark()
      console.error("Error writing document: ", error)
    })
  }

  deleteBookmark = () => {
    // Update UI before it actually happend
    this.uiRefreshForBookmark()
    const bookmarksRef = db.collection('bookmarks').doc(this.state.post.id)
    bookmarksRef.delete()
    .then(() => {
      notificationsStore.showNotification('Unliked')
      this.props.onBookmark()
    }).catch(function(error) {
      // Rollback if something happen
      this.uiRefreshForBookmark()
      console.error("Error writing document: ", error)
    })
  }

  handleBookmark = (e) => {
    e.stopPropagation()
    if(!this.state.post.bookmarked) {
      this.addBookmark()
    } else {
      this.deleteBookmark()
    }
  }

  isSignedIn = () => this.props.user == null ? false : true

  uiRefreshForBookmark = () => {
    const post = this.state.post
    post.bookmarked = !post.bookmarked
    this.setState({post: post})
  }

  isOwner = (user, author) => {
    return user && user.username === author
      ? true
      : false
  }

  render() {
    const { classes, post } = this.props

    function image(post) {
      if (!post.image) {
        return <div style={{ backgroundColor: '#f4f4f4', border: '1px solid #757ce8', width: 130, height: 110, borderRadius: 2}}>
          <LinkIcon color="primary" style={{
            width: '30px', position: 'relative', top: 'calc(50% - 15px)'}}/>
        </div>
      }

      return  <CardMedia
                className={ classes.cover }
                image={ post.image }
              >
                <div style={{ width: 130, height: 110, borderRadius: 2}} />
              </CardMedia>
    }

    return (
      <div className={classes.post}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subheading">
                   { post.category && getCategory(post.category).name }
                </Typography>
                <Typography gutterBottom>{ post.body }</Typography>
                <Typography variant="caption" color="textSecondary">By { post.author } <Moment fromNow={true} interval={30000}>{post.timestamp}</Moment></Typography>
              </Grid>
              <Grid item>
                <PostActions post={ post }
                  isOwner={ this.isOwner() }
                  onDelete={ this.props.onDelete }
                  onMarkSold = { this.props.onMarkSold}
                  url={ "https://locally-57510.firebaseapp.com/posts/" + post.id }
                  onChangeBookmark={ this.handleBookmark }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ButtonBase className={ classes.image }>
              { image(post) }
            </ButtonBase>
          </Grid>
        </Grid>
      </div>
    )
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostCard)
