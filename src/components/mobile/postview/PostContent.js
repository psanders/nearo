import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import Typography from '@material-ui/core/Typography'
import Linkify from 'react-linkify'
import Moment from 'react-moment'
import firebase from 'firebase/app'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

import {
  imageURL,
  postMedia,
  ellip,
  hasPanorama,
  hasMedia,
} from 'components/commons/utils'
import Viewer360 from 'components/shared/viewer360/Viewer360'

export const postContent = (post, classes, gutterBottom) => {

  return <div>
    { hasMedia(post)  &&
      !hasPanorama(post) &&
      <div>
      <ImageGallery
        showBullets={post.media.length > 1}
        lazyLoad={true}
        showPlayButton={false}
        showThumbnails={false}
        showFullscreenButton={false}
        items={postMedia(post)} />
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
        { post.title }
      </Typography>
      <Typography variant="body1" gutterBottom>
        <Linkify>{ post.body }</Linkify>
      </Typography>
      <Typography variant="caption" gutterBottom className={ classes.bottom10} >
        Posted <Moment fromNow={true} interval={30000}>{new firebase.firestore.Timestamp(post.timestamp.seconds, post.timestamp.nanoseconds).toDate()}</Moment> nearby "{ ellip(post.locText, 22) }"
      </Typography>
    </div>
  </div>
}
