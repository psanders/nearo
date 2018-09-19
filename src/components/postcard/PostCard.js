import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import CardMedia from '@material-ui/core/CardMedia'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import LinkIcon from '@material-ui/icons/Link'
import { styles } from './PostCardStyles'
import { observer } from 'mobx-react'

import { getCategory } from '../commons/categories'
import PostActions from './PostActions'

@observer
class PostCard extends React.Component {
  state = {
    post: this.props.post
  }

  static defaultProps = {
    baseUrl: 'https://firebasestorage.googleapis.com/v0/b/locally-57510.appspot.com/o/images'
  }

  isOwner = (user, author) => {
    return user && user.username === author
      ? true
      : false
  }

  render() {
    const { classes, post, baseUrl } = this.props

    const getImage = () => baseUrl + '%2Fthumb_' + post.media[0].filename + '?alt=media'

    function image(post) {
      if (!post.media || post.media.length == 0) {
        return <div style={{ backgroundColor: '#f4f4f4', border: '1px solid #757ce8', width: 130, height: 110, borderRadius: 2}}>
          <LinkIcon color="primary" style={{
            width: '30px', position: 'relative', top: 'calc(50% - 15px)'}}/>
        </div>
      }

      return  <CardMedia
                className={ classes.cover }
                image={ getImage() }
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
                  handleSold={() => { /* NOP */}}
                  onDelete={() => { /* NOP */}}
                  bookmarksStore={this.props.bookmarksStore}
                  postsStore={this.props.postsStore}
                  usersStore={this.props.usersStore}
                  url={ "https://locally-57510.firebaseapp.com/posts/" + post.id }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Link to={'/posts/' + post.id} style={{color: '#fff', textDecoration: 'none'}}>
              <ButtonBase className={ classes.image }
                aria-label="Open Publication Details"
              >
                { image(post) }
              </ButtonBase>
            </Link>
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
