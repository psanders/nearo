import React from 'react'
import Typography from '@material-ui/core/Typography'
import firebase from 'firebase/app'
import Moment from 'react-moment'

import { ellip } from 'components/commons/utils'

const timestamp = timestamp =>
  new firebase.firestore.Timestamp(timestamp.seconds,
      timestamp.nanoseconds).toDate()

const Caption = props => {
  if (!props.post) return null

  return <Typography
    variant="caption"
    color="textSecondary"><Moment fromNow={true}
    interval={30000}>{timestamp(props.post.timestamp)}</Moment> nearby "{ ellip(props.post.locText, 22) }"
  </Typography>
}

export default Caption
