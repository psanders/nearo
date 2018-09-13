import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'

import Ads from './Ads'
import About from './About'
import PostPanel from './postpanel/PostPanel'
import PostCard from './postcard/PostCard'
import { openURL } from './commons/utils'

export default function PostsContainer(props) {
  const user = props.user
  const classes = props.classes

  return (
    <Grid
      container
      direction="row"
      justify="center"
      spacing={32}>
        <Grid item sm={6} xs={12}>
            <Grid item>
              <PostPanel user={user}
                onNewPost={props.onNewPost}
                onNotification={props.onNotification}
              />
            </Grid>
            <div className={classes.gutterBottom}/>
            {
              props.posts.map(post => {
                return (
                   <Grid key={post.id} item onClick={ () => openURL('/posts/' + post.id) } >
                     <PostCard
                      user={user}
                      post={post}
                      onBookmark={ props.onBookmark }
                      onDelete={ props.onDelete }
                      onNotification={ props.onNotification } />
                     <div className={ classes.gutterBottom }/>
                   </Grid>
                 )
              })
            }
            <Hidden smUp={true}>
              <Grid item>
                <About />
              </Grid>
            </Hidden>
        </Grid>
        <Hidden smDown={true}>
          <Grid item sm={3} xs={12}>
              <Ads />
              <div className={ classes.gutterBottom }/>
              <About />
          </Grid>
        </Hidden>
        {
          props.posts.length < props.nbHits &&
          <Grid item>
            <Button onClick={ props.onShowMoreResult }>Show more</Button>
          </Grid>
        }
    </Grid>
  )
}
