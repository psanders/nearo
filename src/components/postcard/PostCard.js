import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardMedia from '@material-ui/core/CardMedia'
import Moment from 'react-moment'
import { styles } from './PostCardStyles'

import { db } from '../commons/firebase/firebase'
import { getCategory } from '../commons/categories'
import PostActions from './PostActions'

class PostCard extends React.Component {
  state = {
    post: this.props.post
  }

  addBookmark = () => {
    if (!this.isSignedIn()) {
      this.props.onNotification('You must login to like a post')
      return
    }
    // Update UI before it actually happend
    this.uiRefreshForBookmark()
    const bookmarksRef = db.collection('bookmarks').doc(this.state.post.id)
    bookmarksRef.set({
      user: this.props.user.email
    }, { merge: true }).then(() => {
      this.props.onNotification('Noted!')
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
      this.props.onNotification('Unliked')
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
    const { classes, post } = this.props;

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
          { post.image &&
            <Grid item>
              <ButtonBase className={classes.image}>
                <CardMedia
                  className={classes.cover}
                  image={post.image}
                >
                  <div style={{width: 130, height: 110, borderBottomLeftRadius: 30}} />
                </CardMedia>
              </ButtonBase>
              </Grid>
          }
        </Grid>
      </div>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostCard);
