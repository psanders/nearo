import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import PostCard from '../../components/postcard/PostCard'

@inject('postsStore')
@observer
class FavList extends Component {

  @computed get posts () {
    return this.props.postsStore.favPosts
  }

  componentDidMount() {
    this.props.postsStore.loadFavorities()
  }

  // If is empty show an image an a message of emptiness
  render() {
    const { classes } = this.props

    return (<Grid container>
      <Grid item xs={12} sm={12} md={6} className={classes.postArea}>
        {
         this.posts.map((post, i) => {
            return <Grid key={post.id} item>
              <PostCard post={post}/>
              {
                i < this.posts.length - 1 &&
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
    height: 5,
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  // What was this for?
  postArea: {
    backgroundColor: '#fff',
    minHeight: 'calc(100vh - 55px)',
  }
})

export default withStyles(styles)(FavList)
