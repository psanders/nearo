import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Linkify from 'react-linkify'
import Card from '@material-ui/core/Card'
import { observer, inject } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles';

import { ellip } from 'components/commons/utils'
import PostImage from './PostImage'
import PlaceHolder from './PlaceHolder'
import Caption from './Caption'

const styles = theme => ({
  root: {
    padding: 0
  },
  card: {
    display: 'flex',
    padding: 5
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5
  },
  content: {
    flex: '1 0 auto',
    paddingBottom: 0
  },
  cover: {
    width: 90,
    height: 90
  },
})

@inject('routing')
@inject('postsStore')
@observer
class PostCard extends Component {

  render() {
    const { classes, post, routing, postsStore } = this.props

    return <Card elevation={0}
      className={classes.card} onClick={() => {
      postsStore.currentPost = post
      routing.push('/posts/' + post.id)
    }}>
      <div className={classes.details}>
        <div className={classes.content}>
          <Typography variant="body1" gutterBottom>
            { post.title }
          </Typography>
          <Typography variant="caption">
            <Linkify>{ ellip(post.body, 50) }</Linkify>
          </Typography>
          <Caption post={ post } />
        </div>
      </div>
      <span style={{flex: 1}} />
      <div>
        { post.media.length > 0 && <PostImage post={ post }/> }
        { post.media.length === 0 && <PlaceHolder /> }
      </div>
    </Card>
  }
}

export default withStyles(styles, { withTheme: true })(PostCard)
