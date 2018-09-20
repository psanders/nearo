import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles'
import { observer } from 'mobx-react'
import { computed } from 'mobx'
import ScrollArea from 'react-scrollbar'

import SubBar from './subbar/SubBar'
import GoogleMap from './map/GoogleMap'
import PostCard from './postcard/PostCard'

@observer
class PostsContainer extends Component {

  @computed get keepScrolling () {
    const pStore = this.props.postsStore
    return !pStore.loadingPosts && pStore.posts.length !== pStore.nbHits ? true : false
  }

  handleScroll = (scrollArea) => {
    if (!this.keepScrolling) {
      return
    }

    if (scrollArea.containerHeight + scrollArea.topPosition === scrollArea.realHeight) {
      this.props.postsStore.showMoreResults()
    }
  }

  render() {
    const posts = this.props.postsStore.posts

    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={6} style={{backgroundColor: '#fff', }}>
          <ScrollArea
            style={{height: 'calc(100vh - 65px)', overflowY: 'scroll'}}
            speed={0.8}
            smoothScrolling={true}
            verticalScrollbarStyle={{backgroundColor: '#c4c4c4'}}
            className="area"
            contentClassName="content"
            onScroll={this.handleScroll}
            horizontal={false}
          >
            <Grid item>
              <SubBar postsStore={ this.props.postsStore } navStore={ this.props.navStore } />
            </Grid>
            {
              posts.map(post => {
                return (
                   <Grid key={ post.id } item>
                     <PostCard
                      notificationsStore={ this.props.notificationsStore }
                      usersStore={ this.props.usersStore }
                      postsStore={ this.props.postsStore }
                      bookmarksStore={ this.props.bookmarksStore }
                      post={ post }
                     />
                   </Grid>
                 )
              })
            }
            {
              this.props.postsStore.loadingPosts &&
              this.props.postsStore.posts > 10 && <LinearProgress />
            }
          </ScrollArea>
        </Grid>
        <Hidden smDown={true}>
          <Grid item sm={6} xs={12}>
            <GoogleMap style={{width: '100%'}} navStore={ this.props.navStore }
              postsStore={ this.props.postsStore }/>
          </Grid>
        </Hidden>
      </Grid>
    )
  }
}

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(PostsContainer)
