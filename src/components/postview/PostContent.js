import React from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import Typography from '@material-ui/core/Typography'
import Linkify from 'react-linkify'
import Moment from 'react-moment'

import {
  imageURL,
  ellip,
  hasPanorama,
  hasMedia,
} from '../commons/utils'
import Viewer360 from '../Viewer360'

export const postContent = (post, classes) => {
  return <div>
    { hasMedia(post)  &&
      !hasPanorama(post) &&
      <CardMedia
        image={ imageURL(post, 'md') }
        className={classes.bottom10}
      >
        {
          post.category === 'forsale' && (post.price > 0 || post.sold) &&
          <Chip
            avatar={<Avatar><MoneyIcon className={classes.moneyIcon}></MoneyIcon></Avatar>}
            label={ post.sold ? 'Sold' : post.price }
            className={classes.chip}
            color="secondary"
          />
        }
        <div style={{ width: 130, height: 300, borderRadius: 2}} />
      </CardMedia>
    }
    {
      hasMedia(post) &&
      hasPanorama(post) &&
      <div className={classes.bottom10}>
        <Viewer360 height="300px"
          imageURL={imageURL(post, 'panorama')}
        />
      </div>
    }
    <div>
      <Typography className={ classes.capitalize } variant="title" gutterBottom>
        { post.category }
      </Typography>
      <Typography variant="body1" gutterBottom>
        <Linkify>{ post.body }</Linkify>
      </Typography>
      <Typography variant="caption" gutterBottom className={classes.bottom10}>
        Posted <Moment fromNow={true} interval={30000}>{post.timestamp.toDate()}</Moment> nearby "{ ellip(post.locText, 22) }"
      </Typography>
    </div>
  </div>
}
