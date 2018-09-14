import React from 'react'
import Grid from '@material-ui/core/Grid'

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
        </Grid>
    </Grid>
  )
}
