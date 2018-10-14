import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import {withStyles} from '@material-ui/core/styles'
import {observer, inject} from 'mobx-react'
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

  componentWillReceiveProps() {
    if(this.props.favorites) {
      this.props.postsStore.loadFavorities().then()
      return
    }
  }

  // If is empty show an image an a message of emptiness
  render() {
    const { classes, postsStore } = this.props

    return (<Grid container>
      <Grid item xs={12} sm={12} md={6} className={classes.postArea}>
        <InfiniteScroll
          hasMore={ postsStore.keepScrolling }
          loadMore={ postsStore.showMoreResults }
          loader={<div key={0}>Loading ...</div>}>
          <Hidden xsDown={true}>
            <Grid item>
              <SubBar/>
            </Grid>
          </Hidden>
          {
           postsStore.posts.map((post, i) => {
              return <Grid key={post.id} item>
                <PostCard post={post}/>
                {
                  i < postsStore.posts.length - 1 &&
                  <div>
                    <Hidden xsDown={true}>
                      <Divider className={classes.dividerDesktop}/>
                    </Hidden>
                    <Hidden smUp={true}>
                      <Divider className={classes.dividerMobile}/>
                    </Hidden>
                  </div>
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
  dividerDesktop: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  dividerMobile: {
    height: 5,
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  mapArea: {
    backgroundColor: '#e5e3df',
    height: 'calc(100vh - 55px)',
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
