import React from 'react'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import ShareIcon from '@material-ui/icons/Link'
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue'
import { withStyles } from '@material-ui/core/styles'
import Ionicon from 'react-ionicons'
import TextField from '@material-ui/core/TextField';
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share'

import { styles } from './PostCardStyles'

class ShareButton extends React.Component {
  state = {
    anchorEl: null,
  }

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handlePopoverClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const { classes, url } = this.props
    const open = Boolean(anchorEl)

    return (
      <span>
        <Button
          aria-owns={anchorEl ? 'mouse-over-popover' : null}
          aria-haspopup="true"
          onClick={ this.handlePopoverOpen }
          className={ classes.actionBtn }
        >
          <ShareIcon className={ classes.actionIcon }/>
          <Typography variant="caption" color="secondary">Share</Typography>
        </Button>
        <Popover
          elevation={2}
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <div style={{width: 350, padding: 10}}>
            <Typography variant="body2">
              Help your friends find local information!
            </Typography>
            <Typography variant="body1">
              Share the link to this post:
            </Typography>
            <div>
              <TextField
                id="outlined-name"
                label="URL"
                value={url}
                fullWidth
                margin="normal"
              />
            </div>
            <div className={classes.row}>
              <FacebookShareButton
                children={
                  <Button className={classes.button}>
                    <Ionicon icon="logo-facebook" className={classes.logoIcon} color={blue[700]}/>
                     Facebook
                  </Button>
                }
                url={ url }
              />
              <TwitterShareButton
                children={
                  <Button className={classes.button}>
                    <Ionicon icon="logo-twitter" className={classes.logoIcon} color={blue[500]}/>
                     Twitter
                  </Button>
                }
                url={ url }
              />
            </div>
          </div>
        </Popover>
      </span>
    )
  }
}

export default withStyles(styles)(ShareButton)
