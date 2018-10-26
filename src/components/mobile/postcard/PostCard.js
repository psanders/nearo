import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import Linkify from 'react-linkify'
import Paper from '@material-ui/core/Paper';
import { observer, inject } from 'mobx-react'

import { hasMedia } from 'components/commons/utils'
import PostActions from 'components/postactions/PostActions'
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
      <ButtonBase aria-label="Open Publication Details" onClick={() => {
        postsStore.currentPost = post
        routing.push('/posts/' + post.id)
      }}>
        { hasMedia(post) && <PostImage post={ post }/> }
        { !hasMedia(post) && <PlaceHolder /> }
      </ButtonBase>
      <div style={style.actionsContainer}>
        <Typography variant="subtitle2" gutterBottom>
          { post.title }
        </Typography>
        <Typography component="p" variant="body1">
          <Linkify>{ post.body }</Linkify>
        </Typography>
        <PostDate post={ post } />
        <PostActions post={ post } />
      </div>
    </Paper>
  }
}

export default PostCard
