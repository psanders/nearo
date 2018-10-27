import React, { Fragment } from 'react'
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
    right: 5,
    bottom: 5,
  },
}

const panoramaIcon = <Icon360 style={style.panorama}/>

const PostImage = props => <Fragment>
  <img alt="" style={ style.width } src={ imageURL(props.post, 'md') } />
   { hasPanorama(props.post) && panoramaIcon }
</Fragment>

export default PostImage
