import React, { Fragment } from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import { imageURL } from 'components/commons/utils'

const style = {
  width: {
    width: 50,
    height: 50
  },
}

const PostImage = props => <Fragment>
  <CardMedia
    style={ style.width }
    title="Live from space album cover"
    image={imageURL(props.post, 'md')}
  />
</Fragment>

export default PostImage
