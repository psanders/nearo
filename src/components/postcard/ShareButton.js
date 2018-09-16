import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ShareIcon from '@material-ui/icons/Link'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'
import Ionicon from 'react-ionicons'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

import { styles } from './PostCardStyles'

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
      <span>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={ this.handleClick }
          className={ classes.actionBtn }
        >
          <ShareIcon className={ classes.actionIcon }/>
          <Typography variant="caption" color="textSecondary">Share</Typography>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={ this.handleClose }
        >
          <MenuItem  onClick={ this.handleClose }>
            <Ionicon  icon="logo-whatsapp" className={ classes.actionIcon } color="#5d5c5c"/>
            <WhatsappShareButton
            children={
              <Typography variant="caption">
               Whatsapp
              </Typography>
            }
             url={ url } />
          </MenuItem>
          <MenuItem  onClick={ this.handleClose }>
            <Ionicon icon="logo-facebook" className={ classes.actionIcon } color="#5d5c5c"/>
            <FacebookShareButton
            children={
              <Typography variant="caption">
               Facebook
              </Typography>
            }
             url={ url } />
          </MenuItem>
          <MenuItem onClick={ this.handleClose }>
            <Ionicon icon="logo-twitter" className={ classes.actionIcon } color="#5d5c5c"/>
            <TwitterShareButton
             children={
               <Typography variant="caption">
                Twitter
               </Typography>
             }
             url={ url } />
          </MenuItem>
        </Menu>
      </span>
    )
  }
}

export default withStyles(styles)(ShareButton)
