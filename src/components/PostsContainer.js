import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { observer } from 'mobx-react'

import SubBar from './subbar/SubBar'
import GoogleMap from './map/GoogleMap'
import PostCard from './postcard/PostCard'
import { openURL } from './commons/utils'

@observer
class PostsContainer extends Component {

  render() {
    const user = this.props.user
    const posts = this.props.postsStore.posts

    return (
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        >
          <Grid item sm={6} xs={12} style={{backgroundColor: '#fff'}}>
            <div style={{postion:'absolute', height: 'calc(100vh - 55px)', overflowY: 'scroll'}}>
              <Grid item>
                <SubBar postsStore={ this.props.postsStore } navStore={ this.props.navStore } />
              </Grid>
              {
                posts.map(post => {
                  return (
                     <Grid key={ post.id } item onClick={ () => openURL('/posts/' + post.id) } >
                       <PostCard
                        user={ user }
                        post={ post }
                        />
                     </Grid>
                   )
                })
              }
            </div>
          </Grid>
          <Hidden smDown={true}>
            <Grid item sm={6} xs={12}>
              <GoogleMap navStore={ this.props.navStore }
                postsStore={ this.props.postsStore }
                style={{height: '100vh', width: '100%' }}/>
            </Grid>
          </Hidden>
      </Grid>
    )
  }
}

export default PostsContainer
