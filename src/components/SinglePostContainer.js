import React from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'

import Ads from './Ads'
import About from './About'
import PostCard from './postcard/PostCard'

export default function SinglePostContainer(props) {
  const user = props.user
  const classes = props.classes

  return (
    <Grid
      container
      direction="row"
      justify="center"
      spacing={32}>
        <Grid item sm={6} xs={12}>
            { props.post && <Grid key={props.post.id} item>
              <PostCard
                user={ user }
                post={ props.post }
                onBookmark={ props.onBookmark }
                onDelete={ props.onDelete }
                onNotification={ props.onNotification }
              />
              <div className={ classes.gutterBottom }/>
              </Grid>
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
    </Grid>
  )
}
