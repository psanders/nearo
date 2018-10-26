import React from 'react'
import LinkIcon from '@material-ui/icons/Link'

const style = {
  linkedIcon: {
    transform: 'rotate(45deg)',
    width: '30px',
    position: 'relative',
    top: 'calc(50% - 15px)'
  },
  placeHolder: {
    backgroundColor: '#f4f4f4',
    border: '1px solid #757ce8',
    width: 130,
    height: 110,
    borderRadius: 3,
    margin: 10
  }
}

const ImagePlaceHolder = () => <div style={ style.placeHolder } >
  <LinkIcon style={style.linkedIcon} color="primary" />
</div>

export default ImagePlaceHolder
