import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { observer } from 'mobx-react'

import SubBar from './subbar/SubBar'
import GoogleMap from './map/GoogleMap'
import PostCard from './postcard/PostCard'

@observer
class PostsContainer extends Component {

  render() {
    const user = this.props.user
    const posts = this.props.postsStore.posts

    return (
      <Grid container>
          <Grid item xs={12} sm={12} md={6} style={{backgroundColor: '#fff', height: 'calc(100vh - 65px)', overflowY: 'scroll'}}>
            <div>
              <Grid item>
                <SubBar postsStore={ this.props.postsStore } navStore={ this.props.navStore } />
              </Grid>
              {
                posts.map(post => {
                  return (
                     <Grid key={ post.id } item>
                       <PostCard
                        usersStore={this.props.usersStore}
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
              <GoogleMap style={{width: '100%'}} navStore={ this.props.navStore }
                postsStore={ this.props.postsStore }/>
            </Grid>
          </Hidden>
      </Grid>
    )
  }
}

export default PostsContainer
