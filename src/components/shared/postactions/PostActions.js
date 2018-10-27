import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FavBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavIcon from '@material-ui/icons/Favorite'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import SoldOutIcon from '@material-ui/icons/AttachMoney'
import IconButton from '@material-ui/core/IconButton'
import classnames from 'classnames'

import ShareButton from './ShareButton'
import { styles } from './PostCardStyles'
import { observer, inject } from 'mobx-react'
import { computed, when } from 'mobx'

@inject('routing')
@inject('bookmarksStore')
@inject('postsStore')
@inject('usersStore')
@observer
class PostActions extends Component {
  state = {
    likeBtnDisable: false,
    bookmarked: false
  }

  componentDidMount() {
    // This is a huge hack to prevent users from adding multiple likes
    when(
      () => this.bookmarked,
      () => this.setState({bookmarked: this.bookmarked})
    )
  }

  @computed get bookmarked() {
    return this.props && this.props.bookmarksStore.bookmarks.includes(this.props.post.id)
  }

  @computed get post() {
    return this.props.postsStore.posts.find(post => post.id === this.props.post.id)
  }

  handleBookmark = () => {
    if(!this.state.bookmarked) {
      this.props.bookmarksStore.addToBookmarks(this.post, this.props.usersStore.currentUser)
    } else {
      this.props.bookmarksStore.removeFromBookmarks(this.post, this.props.usersStore.currentUser)
    }

    if(!this.props.usersStore.isSignedIn()) {
      return
    }

    this.setState({
      bookmarked: !this.state.bookmarked,
    });

    this.setState({
      likeBtnDisable: true,
    });

    // enable after 5 second
    setTimeout(()=>{ this.setState({ likeBtnDisable: false})}, 1000)
  }

  handleSold = () => this.props.postsStore.markSold(this.props.post)

  handleRemove = () => {
    this.props.postsStore.handlePostDelete(this.props.post)
    if (this.props.routing.location.pathname.includes('/posts/')) {
      this.props.routing.push('/explore')
      return
    }
    this.props.routing.push('/')
  }

  isOwner = () => {
    const currentUser = this.props.usersStore.currentUser
    return currentUser && currentUser.id === this.props.post.userId
      ? true
      : false
  }

  render() {
    const { classes, post, home } = this.props

    const homeActions = () => <div>
      <IconButton
        disabled={this.state.likeBtnDisable}
        onClick={this.handleBookmark}
        aria-label="Add to favorites">
        {
          !this.state.bookmarked
          ? <FavBorderIcon  />
          : <FavIcon className={classes.favLiked } />
        }
      </IconButton>
      <ShareButton home={true} post={post} />
    </div>

    const elseWhere = () => <div>
      <Button
        disabled={this.state.likeBtnDisable}
        className={classes.actionBtn} onClick={this.handleBookmark}>
        { !this.state.bookmarked
          ? <FavBorderIcon className={classes.actionIcon } />
          : <FavIcon className={classnames(classes.actionIcon, classes.favLiked) } /> }
        {
          this.post && this.post.likes > 0 &&
          <Typography variant="caption" color="secondary">
            { this.post.likes }
          </Typography>
        }
      </Button>
      <ShareButton post={ post }/>
      {
        this.post &&
        this.isOwner() &&
        this.props.post.category === 'forsale' &&
        <Button onClick={ this.handleSold } className={classes.actionBtn} >
          <SoldOutIcon className={classes.actionIcon } />
          <Typography variant="caption" color="secondary">
            { this.post.sold? "Mark Available" : "Mark Sold" }
          </Typography>
        </Button>
      }
      {
        this.isOwner() &&
        <Button onClick={this.handleRemove} className={classes.actionBtn}>
          <DeleteIcon className={classes.actionIcon } />
        </Button>
      }
    </div>

    return home ? homeActions() : elseWhere()
  }
}

PostActions.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostActions)
