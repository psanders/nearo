import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FavBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavIcon from '@material-ui/icons/Favorite'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import SoldOutIcon from '@material-ui/icons/AttachMoney'
import ShareButton from './ShareButton'
import { styles } from './PostCardStyles'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'
import { withRouter } from 'react-router-dom'

@inject('bookmarksStore')
@inject('postsStore')
@inject('usersStore')
@withRouter
@observer
class PostActions extends Component {

  @computed get bookmarked() {
    return this.props.bookmarksStore.bookmarks.includes(this.props.post.id)
  }

  handleBookmark = () => {
    if(!this.bookmarked) {
      this.props.bookmarksStore.addToBookmarks(this.props.post)
    } else {
      this.props.bookmarksStore.removeFromBookmarks(this.props.post)
    }
  }

  handleSold = () => {
    this.props.postsStore.markSold(this.props.post)
    this.props.handleSold(this.state.post.sold)
  }

  handleRemove = () => {
    this.props.postsStore.handlePostDelete(this.props.post)
    this.props.history.push('/')
  }

  isOwner = () => {
    const currentUser = this.props.usersStore.currentUser
    return currentUser && currentUser.username === this.props.post.author
      ? true
      : false
  }

  render() {
    const { classes, url, post } = this.props

    return (
      <div>
        <Button className={classes.actionBtn} onClick={this.handleBookmark}>
          { !this.bookmarked && <FavBorderIcon className={classes.actionIcon } /> }
          { this.bookmarked && <FavIcon className={classes.liked } /> }
          <Typography variant="caption" color="secondary">
            { this.bookmarked && "Unlike"  }
            { !this.bookmarked && "Like" }
          </Typography>
        </Button>
        <ShareButton url={ url } post={ post }/>
        {
          this.isOwner() &&
          this.state.post.category === 'forsale' &&
          <Button onClick={ this.handleSold } className={classes.actionBtn} >
            <SoldOutIcon className={classes.actionIcon } />
            <Typography variant="caption" color="secondary">
              { post.sold? "Mark Available" : "Mark Sold" }
            </Typography>
          </Button>
        }
        {
          this.isOwner() &&
          <Button onClick={this.handleRemove} className={classes.actionBtn}>
            <DeleteIcon className={classes.actionIcon } />
            <Typography variant="caption" color="secondary">
              Remove
            </Typography>
          </Button>
        }
      </div>
    )
  }
}

PostActions.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostActions)
