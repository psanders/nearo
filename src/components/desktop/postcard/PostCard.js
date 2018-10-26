import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'

import Moment from 'react-moment'
import Linkify from 'react-linkify'
import firebase from 'firebase/app'
import { observer, inject } from 'mobx-react'
import { hasMedia } from 'components/commons/utils'
import PostActions from 'components/shared/postactions/PostActions'
import PlaceHolder from 'components/mobile/postcard/PlaceHolder'
import PostImage from 'components/desktop/postcard/PostImage'

const styles = {
  postDesktop: {
    '&:hover': {
      backgroundColor: '#E3F2FD'
    }
  },
  actionsContainer: {
    padding: 10
  },
}

@inject('routing')
@inject('postsStore')
@observer
class PostCard extends React.Component {

  render() {
    const { classes, post, routing, postsStore } = this.props

    return <Paper elevation={0} className={ classes.postDesktop }>
      <Grid container>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={0}>
            <Grid item xs style={{padding: 10}}>
              <Typography variant="subtitle1" gutterBottom>
                { post.title }
              </Typography>
              <Typography variant="body1" gutterBottom>
                <Linkify>{ post.body }</Linkify>
              </Typography>
              <Typography variant="caption" color="textSecondary">By { post.author }
                &nbsp;<Moment fromNow={true} interval={30000}>{new firebase.firestore.Timestamp(post.timestamp.seconds, post.timestamp.nanoseconds).toDate()}</Moment>
              </Typography>
            </Grid>
            <Grid item >
              <div className={classes.actionsContainer}>
                <PostActions post={ post } />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{paddingTop: 35}}>
          <ButtonBase className={classes.image} aria-label="Open Publication Details" onClick={() => {
            postsStore.currentPost = post
            routing.push('/posts/' + post.id)}
          }>
            { hasMedia(post) && <PostImage post={ post }/> }
            { !hasMedia(post) && <PlaceHolder /> }
          </ButtonBase>
        </Grid>
      </Grid>
    </Paper>
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostCard)
