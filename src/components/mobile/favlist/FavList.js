import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import PostCard from 'components/mobile/postcard/PostCard'

class FavList extends Component {

  // If is empty show an image an a message of emptiness
  render() {
    const { classes, posts } = this.props

    return (<Grid container>
      <Grid item xs={12} sm={12} md={6} className={classes.postArea}>
        {
         posts.map((post, i) => {
            return <Grid key={post.id} item>
              <PostCard post={post}/>
              {
                i < posts.length - 1 &&
                <Divider className={classes.divider}/>
              }
            </Grid>
          })
        }
      </Grid>
    </Grid>)
  }
}

const styles = theme => ({
  divider: {
    height: 1,
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  // What was this for?
  postArea: {
    backgroundColor: '#fff',
    minHeight: 'calc(100vh - 49px)',
  }
})

export default withStyles(styles)(FavList)
