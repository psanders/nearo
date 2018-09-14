import React from 'react'
import Grid from '@material-ui/core/Grid'

import PostPanel from './postpanel/PostPanel'
import GoogleMap from './map/GoogleMap'
import PostCard from './postcard/PostCard'
import { openURL } from './commons/utils'

export default function PostsContainer(props) {
  const user = props.user

  return (
    <Grid
      container
      justify="flex-start"
      alignItems="flex-start"
      >
        <Grid item sm={6} xs={12} style={{backgroundColor: '#fff'}}>
          <div style={{postion:'absolute', height: 'calc(100vh - 45px)', overflowY: 'scroll'}}>
            <Grid item>
              <PostPanel user={user}
                onNewPost={props.onNewPost}
                onNotification={props.onNotification}
              />
            </Grid>
            {
              props.posts.map(post => {
                return (
                   <Grid key={post.id} item onClick={ () => openURL('/posts/' + post.id) } >
                     <PostCard
                      user={user}
                      post={post}
                      onBookmark={ props.onBookmark }
                      onDelete={ props.onDelete }
                      onMarkSold = { props.onMarkSold }
                      onNotification={ props.onNotification } />
                   </Grid>
                 )
              })
            }
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <GoogleMap style={{height: '100vh', width: '100%' }}/>
        </Grid>
    </Grid>
  )
}
