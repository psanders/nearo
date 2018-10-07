import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import {withStyles} from '@material-ui/core/styles'
import {observer, inject} from 'mobx-react'
import {computed} from 'mobx'
import InfiniteScroll from 'react-infinite-scroller'

import SubBar from './subbar/SubBar'
import GoogleMap from './map/GoogleMap'
import PostCard from './postcard/PostCard'

@inject('postsStore')
@inject('navStore')
@inject('usersStore')
@inject('bookmarksStore')
@inject('notificationsStore')
@observer
class PostsContainer extends Component {
  @computed get keepScrolling() {
    const pStore = this.props.postsStore
    return !pStore.loadingPosts && pStore.posts.length !== pStore.nbHits
      ? true
      : false
  }

  @computed get posts() {
    return this.props.postsStore.posts
  }

  handleScroll = (scrollArea) => {
    this.props.postsStore.showMoreResults()
  }

  render() {
    const { classes } = this.props

    return (<Grid container>
      <Grid item xs={12} sm={12} md={6} className={classes.postArea}>
        <InfiniteScroll
          hasMore={this.keepScrolling}
          loadMore={this.handleScroll}
          loader={<div className="loader" key={0}>Loading ...</div>}>
          <Grid item>
            <SubBar/>
          </Grid>
          {
           this.posts.map(post => {
              return (<Grid key={post.id} item>
                <PostCard post={post}/>
              </Grid>)
            })
          }
        </InfiniteScroll>
      </Grid>
      <Hidden smDown={true}>
        <Grid item sm={6} xs={12} className={classes.mapArea}>
          <GoogleMap />
        </Grid>
      </Hidden>
    </Grid>)
  }
}

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  mapArea: {
    height: 'calc(100vh - 65px)',
    position: 'fixed',
    width: '50%',
    left: '50%',
    backgroundColor: '#e5e3df'
  },
  postArea: {
    backgroundColor: '#fff',
    minHeight: 'calc(100vh - 65px)',
  }
})

export default withStyles(styles)(PostsContainer)
