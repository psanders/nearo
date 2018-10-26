import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import Typography from '@material-ui/core/Typography'
import Linkify from 'react-linkify'
import Moment from 'react-moment'
import firebase from 'firebase/app'

import {
  imageURL,
  ellip,
  hasPanorama,
  hasMedia,
} from '../../commons/utils'
import Viewer360 from '../../Viewer360'

export const postContent = (post, classes, gutterBottom) => {

  return <div>
    { hasMedia(post)  &&
      !hasPanorama(post) &&
      <div>
        <img alt="" className={classes.photo} src={imageURL(post, 'md')} />
        {
          post.category === 'forsale' && (post.price > 0 || post.sold) &&
          <Chip
            avatar={<Avatar><MoneyIcon className={classes.moneyIcon}></MoneyIcon></Avatar>}
            label={ post.sold ? 'Sold' : post.price }
            className={classes.chip}
            color="secondary"
          />
        }
      </div>
    }
    {
      hasMedia(post) &&
      hasPanorama(post) && <Viewer360 height="400px" imageURL={imageURL(post, 'panorama')} />
    }
    <div className={classes.postContainer}>
      <Typography className={ classes.capitalize } component="h1" variant="h6" gutterBottom>
        { post.title? post.title : post.category }
      </Typography>
      <Typography variant="body1" gutterBottom>
        <Linkify>{ post.body }</Linkify>
      </Typography>
      <Typography variant="caption" gutterBottom className={classes.bottom10}>
        Posted <Moment fromNow={true} interval={30000}>{new firebase.firestore.Timestamp(post.timestamp.seconds, post.timestamp.nanoseconds).toDate()}</Moment> nearby "{ ellip(post.locText, 22) }"
      </Typography>
    </div>
  </div>
}
