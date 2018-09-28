import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from '@material-ui/core/styles'
import {observer, inject} from 'mobx-react'
import {computed} from 'mobx'
import ScrollArea from 'react-scrollbar'

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
    if (!this.keepScrolling) {
      return
    }
    if (scrollArea.containerHeight + scrollArea.topPosition === scrollArea.realHeight) {
      this.props.postsStore.showMoreResults()
    }
  }

  @computed get posts() {
    return this.props.postsStore.posts
  }

  render() {
    const {postsStore, classes} = this.props

    return (<Grid container>
      <Grid item xs={12} sm={12} md={6} style={{
          backgroundColor: '#fff'
        }}>
        <ScrollArea smoothScrolling={false} className={classes.scrollArea} verticalScrollbarStyle={{
            backgroundColor: '#c4c4c4'
          }} onScroll={this.handleScroll} horizontal={false}>
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
          {this.props.postsStore.loadingPosts && this.props.postsStore.posts > 10 && <LinearProgress/>}
        </ScrollArea>
      </Grid>
      <Hidden smDown={true}>
        <Grid item sm={6} xs={12}>
          <GoogleMap style={{width: '100%'}}/>
        </Grid>
      </Hidden>
    </Grid>)
  }
}

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  scrollArea: {
    height: 'calc(100vh - 65px)'
  }
});

export default withStyles(styles)(PostsContainer)
