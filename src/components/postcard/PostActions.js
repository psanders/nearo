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
import { observer } from 'mobx-react'
import { computed } from 'mobx'

@observer
class PostActions extends Component {
  state = {
    post: this.props.post
  }

  @computed get bookmarked() {
    return this.props.bookmarksStore.bookmarks.includes(this.state.post.id)
  }

  handleBookmark = () => {
    // I know it looks backwards...
    if(!this.bookmarked) {
      this.props.bookmarksStore.addToBookmarks(this.state.post)
    } else {
      this.props.bookmarksStore.removeFromBookmarks(this.state.post)
    }
  }

  handleSold = () => {
    this.props.postsStore.markSold(this.state.post)
    this.props.handleSold(this.state.post.sold)
    const chpost = this.state.post
    chpost.sold = !chpost.sold
    this.setState(chpost:post)
  }

  isOwner = (post) => {
    const currentUser = this.props.usersStore.currentUser
    return currentUser && currentUser.username === post.author
      ? true
      : false
  }

  render() {
    const { classes, url } = this.props
    const { post } = this.state

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
          this.isOwner(post) &&
          this.state.post.category === 'forsale' &&
          <Button onClick={ this.handleSold } className={classes.actionBtn} >
            <SoldOutIcon className={classes.actionIcon } />
            <Typography variant="caption" color="secondary">
              { post.sold? "Mark Available" : "Mark Sold" }
            </Typography>
          </Button>
        }
        {
          this.isOwner(post) &&
          <Button onClick={() => this.props.postsStore.handlePostDelete(post, this.props.onDelete)}
            className={classes.actionBtn}
          >
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
