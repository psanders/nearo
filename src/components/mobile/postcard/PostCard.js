import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import Linkify from 'react-linkify'
import Paper from '@material-ui/core/Paper';
import { observer, inject } from 'mobx-react'

import { hasMedia } from '../../commons/utils'
import PostActions from '../../postactions/PostActions'
import PostImage from './PostImage'
import PlaceHolder from './PlaceHolder'
import PostDate from './PostDate'

const style = {
  actionsContainer: {
    padding: 10
  }
}

@inject('routing')
@inject('postsStore')
@observer
class PostCard extends Component {

  render() {
    const { post, routing, postsStore } = this.props

    return <Paper elevation={0}>
      <Grid container>
        <Grid item>
          <ButtonBase aria-label="Open Publication Details" onClick={() => {
            postsStore.currentPost = post
            routing.push('/posts/' + post.id)
          }}>
            { hasMedia(post) && <PostImage post={ post }/> }
            { !hasMedia(post) && <PlaceHolder /> }
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={0}>
            <Grid item xs style={{padding: 10}}>
              <Typography variant="subtitle2" gutterBottom>
                { post.title }
              </Typography>
              <Typography component="p" variant="body1" gutterBottom>
                <Linkify>{ post.body }</Linkify>
              </Typography>
              <PostDate post={ post } />
             </Grid>
            <Grid item >
              <div style={style.actionsContainer}>
                <PostActions post={ post } />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  }
}

export default PostCard
