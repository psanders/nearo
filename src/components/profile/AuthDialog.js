import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import AuthIcon from '@material-ui/icons/Fingerprint'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'

import {doSignInWithGoogle, doSignInWithFacebook} from '../commons/firebase/auth'

@inject('notificationsStore')
@inject('usersStore')
@observer
class PostPanel extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => this.setState({open: true})

  handleClose = () => this.setState({open: false})

  render() {
    const { classes, fullScreen, usersStore } = this.props
    const { open } = this.state

    return (
      <div>
        <Hidden smDown={true}>
          <Button onClick={ this.handleOpen } variant="outlined" className={classes.loginBtn}
            aria-label="Sign Up"
          >
            Login
          </Button>
          <Button onClick={ this.handleOpen } variant="outlined" className={classes.signupBtn}
            aria-label="Sign Up"
          >
            Sign Up
          </Button>
        </Hidden>
        <Hidden mdUp={true}>
          {
            !usersStore.isSignedIn() &&
            <Button onClick={ this.handleOpen }
              aria-label="Open Authentication Window"
            >
              <AuthIcon className={ classes.authIcon } />
            </Button>
          }
        </Hidden>

        <Dialog
          fullScreen={ fullScreen }
          open={open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Nearo</DialogTitle>

          <DialogContent className={ classes.details }>
            <div >
              <Button onClick={ doSignInWithFacebook } variant="flat"
                aria-label="Sign Up with Facebook"
                className={classnames(classes.button, classes.fbButton)}
              >
                Connect with Facebook
              </Button>

            <Button onClick={ doSignInWithGoogle } variant="flat"
              aria-label="Authenticate with Google"
              className={classnames(classes.button, classes.goolButton)}
            >
              Connect with Google
            </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

PostPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
}

const styles = theme => ({
  button: {
    textTransform: 'capitalize',
    width: 200
  },
  fbButton: {
    color: '#fff',
    width: 200,
    backgroundColor: blue[700],
    '&:hover': {
      backgroundColor: blue[600]
    },
  },
  goolButton: {
    color: '#fff',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[400]
    },
  },
  authIcon: {
    fontSize: 25,
    color: '#FFEA00'
  },
  loginBtn: {
    textTransform: 'capitalize',
    marginLeft: 8,
    color: '#fff',
    border: '1px solid #fff'
  },
  signupBtn: {
    textTransform: 'capitalize',
    marginLeft: 8,
    color: '#000',
    backgroundColor: theme.palette.accent.main,
    borderColor: theme.palette.accent.main,
    '&:hover': {
      backgroundColor: theme.palette.accent.light
    },
  },
})

export default withMobileDialog({breakpoint: 'xs'})(withStyles(styles)(PostPanel))
