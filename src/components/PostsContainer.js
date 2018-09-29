import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from '@material-ui/core/styles'
import {observer, inject} from 'mobx-react'
import {computed} from 'mobx'
import InfiniteScroll from 'react-infinite-scroller';

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

  handleScroll = (scrollArea) => {
    this.props.postsStore.showMoreResults()
  }

  @computed get posts() {
    return this.props.postsStore.posts
  }

  render() {
    const { classes } = this.props

    return (<Grid container>
      <Grid item xs={12} sm={12} md={6} style={{
          backgroundColor: '#fff'
        }}>
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
        <Grid item sm={6} xs={12} className={classes.fixedArea}>
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
  fixedArea: {
    height: 'calc(100vh - 65px)',
    position: 'fixed',
    width: '50%',
    left: '50%'
  }
});

export default withStyles(styles)(PostsContainer)
