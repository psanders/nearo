import React, { Fragment } from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import Icon360 from '@material-ui/icons/ThreeSixty'
import { imageURL, hasPanorama } from 'components/commons/utils'

const style = {
  width: {
    width: '100vw'
  },
  panorama: {
    position: 'absolute',
    backgroundPosition: '5px -1px',
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,.4)',
    borderColor: '#fff',
    color: '#fff',
    padding: 3,
    height: 20,
    width: 20,
    right: 15,
    bottom: 15,
  },
  cover: {
    minHeight: 50,
    borderRadius: 2,
    width: 130,
    height: 110,
    margin: 10
  },
}

const panoramaIcon = <Icon360 style={style.panorama}/>

const PostImage = props => <Fragment>
  <CardMedia
     style={ style.cover }
     image={ imageURL(props.post, 'sm') }
  >
   { hasPanorama(props.post) && panoramaIcon }
  </CardMedia>
</Fragment>

export default PostImage
