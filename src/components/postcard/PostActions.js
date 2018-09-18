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
import MoreButton from './MoreButton'
import { styles } from './PostCardStyles'
import { observer } from 'mobx-react'

@observer
class PostActions extends Component {
  state = {
    post: this.props.post
  }

  componentDidMount () {
    // Check if post has been bookmarked
    if(this.props.bookmarksStore.isBookmarked(this.state.post)) {
      const post = this.state.post
      post.bookmarked = true
      this.setState(post: post)
    }
  }

  handleBookmark = (e) => {
    e.stopPropagation()
    this.uiRefreshForBookmark()
    // I know it looks backwards...
    if(this.state.post.bookmarked) {
      this.props.bookmarksStore.addToBookmarks(this.state.post, this.uiRefreshForBookmark)
    } else {
      this.props.bookmarksStore.removeFromBookmarks(this.state.post)
    }
  }

  uiRefreshForBookmark = () => {
    const post = this.state.post
    post.bookmarked = !post.bookmarked
    this.setState({post: post})
  }

  render() {
    const { classes, isOwner, url } = this.props
    const { post } = this.state

    return (
      <div>
        <Button className={classes.actionBtn} onClick={this.handleBookmark}>
          { !post.bookmarked && <FavBorderIcon className={classes.actionIcon } /> }
          { post.bookmarked && <FavIcon className={classes.liked } /> }
          <Typography variant="caption" color="secondary">
            { post.bookmarked && "Unlike"  }
            { !post.bookmarked && "Like" }
          </Typography>

          {post.bookmarked}
        </Button>
        <ShareButton url={ url } post={ post }/>
        {
          isOwner &&
          <Button className={classes.actionBtn}>
            <SoldOutIcon className={classes.actionIcon } />
            <Typography variant="caption" color="secondary">
              Mark Sold
            </Typography>
            {post.bookmarked}
          </Button>
        }
        {
          isOwner &&
          <Button className={classes.actionBtn}>
            <DeleteIcon className={classes.actionIcon } />
            <Typography variant="caption" color="secondary">
              Remove
            </Typography>
            {post.bookmarked}
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
