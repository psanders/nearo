import React from 'react'
import LinkIcon from '@material-ui/icons/Link'

const style = {
  linkedIcon: {
    transform: 'rotate(45deg)',
    width: '30px',
    position: 'relative',
    top: 'calc(50% - 15px)',
    left: 'calc(50% - 15px)'
  },
  placeHolder: {
    backgroundColor: '#f4f4f4',
    border: '1px solid #757ce8',
    width: 79,
    height: 79,
  }
}

const ImagePlaceHolder = () => <div style={ style.placeHolder } >
  <LinkIcon style={style.linkedIcon} color="primary" />
</div>

export default ImagePlaceHolder
