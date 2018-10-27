import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'
import InfiniteScroll from 'react-infinite-scroller'

import SubBar from 'components/desktop/subbar/SubBar'
import GoogleMap from 'components/desktop/map/GoogleMap'
import PostCard from 'components/desktop/postcard/PostCard'

@inject('postsStore')
@inject('navStore')
@inject('usersStore')
@inject('bookmarksStore')
@inject('notificationsStore')
@observer
class PostsContainer extends Component {
  @computed get posts () {
    return this.props.postsStore.posts
  }

  componentWillReceiveProps() {
    if(this.props.favorites) {
      this.props.postsStore.loadFavorities()
      return
    }
  }

  render() {
    const { classes, postsStore } = this.props

    return (<Grid container>
      <Grid item xs={12} sm={12} md={6} className={classes.postArea}>
        <InfiniteScroll
          hasMore={ postsStore.keepScrolling }
          loadMore={ postsStore.showMoreResults }
          loader={<div key={0}>Loading ...</div>}>
          <Grid item>
            <SubBar/>
          </Grid>
          {
           this.posts.map((post, i) => {
              return <Grid key={post.id} item>
                <PostCard post={post}/>
                {
                  i < postsStore.posts.length - 1 &&
                  <Divider className={classes.divider}/>
                }
              </Grid>
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
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  dividerMobile: {
    height: 5,
  },
  mapArea: {
    backgroundColor: '#e5e3df',
    height: 'calc(100vh - 64px)',
    position: 'fixed',
    width: '50%',
    left: '50%'
  },
  // What was this for?
  postArea: {
    backgroundColor: '#fff',
    minHeight: 'calc(100vh - 55px)',
  }
})

export default withStyles(styles)(PostsContainer)
