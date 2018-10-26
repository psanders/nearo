import React from 'react'
import Typography from '@material-ui/core/Typography'
import firebase from 'firebase/app'
import Moment from 'react-moment'

const timestamp = timestamp =>
  new firebase.firestore.Timestamp(timestamp.seconds,
      timestamp.nanoseconds).toDate()

const PostDate = props => <Typography
  variant="caption"
  color="textSecondary">By { props.post.author } &nbsp;
  <Moment fromNow={true} interval={30000}>
    { timestamp(props.post.timestamp) }
  </Moment>
</Typography>

export default PostDate
