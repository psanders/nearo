import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { observer } from 'mobx-react'

import FiltersBar from './filtersbar/FiltersBar'
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
            <div style={{postion:'absolute', height: 'calc(100vh - 45px)', overflowY: 'scroll'}}>
              <Grid item>
                <FiltersBar onChangedFilter={ this.props.onChangedFilter } />
              </Grid>
              {
                posts.map(post => {
                  return (
                     <Grid key={ post.id } item onClick={ () => openURL('/posts/' + post.id) } >
                       <PostCard
                        user={ user }
                        post={ post }
                        onBookmark={ this.props.onBookmark }
                        onDelete={ this.props.onDelete }
                        onMarkSold = { this.props.onMarkSold }
                        />
                     </Grid>
                   )
                })
              }
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <GoogleMap store={ this.props.postsStore } style={{height: '100vh', width: '100%' }}/>
          </Grid>
      </Grid>
    )
  }
}

export default PostsContainer
