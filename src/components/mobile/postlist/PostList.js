import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'
import InfiniteScroll from 'react-infinite-scroller'

import PostCard from '../postcard/PostCard'

@inject('postsStore')
@inject('navStore')
@inject('usersStore')
@inject('bookmarksStore')
@inject('notificationsStore')
@observer
class PostList extends Component {
  @computed get posts () {
    return this.props.postsStore.posts
  }

  componentWillReceiveProps() {
    if(this.props.favorites) {
      this.props.postsStore.loadFavorities()
      return
    }
  }

  // If is empty show an image an a message of emptiness
  render() {
    const { classes, postsStore } = this.props

    return (<div>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} className={classes.postArea}>
          <InfiniteScroll
            hasMore={ postsStore.keepScrolling }
            loadMore={ postsStore.showMoreResults }
            loader={<div key={0}>Loading ...</div>}>
            {
             this.posts.map((post, i) => {
                return <Grid key={post.id} item>
                  <PostCard post={post}/>
                  {
                    i < postsStore.posts.length - 1 && <Divider className={classes.divider}/>
                  }
                </Grid>
              })
            }
          </InfiniteScroll>
        </Grid>
      </Grid>
    </div>)
  }
}

const styles = theme => ({
  divider: {
    height: 1,
    borderColor: '#E6E6E6'
  },
  // What was this for?
  postArea: {
    backgroundColor: '#fff',
    minHeight: 'calc(100vh - 55px)',
  },
})

export default withStyles(styles)(PostList)
