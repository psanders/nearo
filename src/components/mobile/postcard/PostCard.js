import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import { observer, inject } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'

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
    width: 50,
    height: 50
  },
  price: {
    marginLeft: 3,
    fontSize: 12,
    color: green[400],
    border: '1px solid gray',
    borderRadius: 2,
    paddingLeft: 3,
    paddingRight: 3
  }
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
          <Typography variant="body1">
            { post.title }
            { post.category === 'forsale' &&
              post.price !== 0 &&
              <span className={classes.price}>
                {"$" + post.price }
              </span>
            }
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
