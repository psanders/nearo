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
    //this.uiRefreshForBookmark()
    // I know it looks backwards...
    if(!this.bookmarked) {
      this.props.bookmarksStore.addToBookmarks(this.state.post)
    } else {
      this.props.bookmarksStore.removeFromBookmarks(this.state.post)
    }
  }

  render() {
    const { classes, isOwner, url } = this.props
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
