import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ShareIcon from '@material-ui/icons/Share'
import { withStyles } from '@material-ui/core/styles'
import Ionicon from 'react-ionicons'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

const styles = theme => ({
  card: {
    display: 'flex',
    border: '1px solid #cdcdcd',
    minHeight: 170,
    '&:hover': {
        border: '1px solid #444',
        cursor: 'pointer'
    }
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minHeight: 300,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit + 5,
    paddingBottom: 8
  },
  button: {
    textTransform: 'Capitalize',
    fontSize: 12,
    color: '#5d5c5c',
    marginRight: 2
  },
  icon: {
    color: '#5d5c5c',
    marginRight: 8,
    fontSize: '20px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  avatar: {
    width: 25,
    height: 25,
    backgroundColor: '#3a3aa2',
  },
  header: {
    padding: 0
  },
  chip: {
    margin: theme.spacing.unit,
  },
})

class ShareButton extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = e => {
    e.stopPropagation()
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose = (e) => {
    e.stopPropagation()
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const { classes, url } = this.props

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={ this.handleClick }
          className={ classes.button }
        >
          <ShareIcon className={ classes.icon }/>
          Share
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={ this.handleClose }
        >
          <MenuItem  onClick={ this.handleClose }>
            <Ionicon  icon="logo-whatsapp" className={ classes.icon } color="#5d5c5c"/>
            <WhatsappShareButton
             children="Whatsapp"
             url={url} />
          </MenuItem>
          <MenuItem  onClick={ this.handleClose }>
            <Ionicon  icon="logo-facebook" className={ classes.icon } color="#5d5c5c"/>
            <FacebookShareButton
             children="Facebook"
             url={url} />
          </MenuItem>
          <MenuItem onClick={ this.handleClose }>
            <Ionicon icon="logo-twitter" className={ classes.icon } color="#5d5c5c"/>
            <TwitterShareButton
             children="Twitter"
             url={url} />
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(ShareButton)
