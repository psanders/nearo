import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import AuthIcon from '@material-ui/icons/Fingerprint'
import SignUp from './SignUp'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import classnames from 'classnames'

import { observer, inject } from 'mobx-react'

import {
  doSignInWithGoogle,
  doSignInWithFacebook,
  doSignInWithEmail
} from '../commons/firebase/auth'

@inject('notificationsStore')
@inject('usersStore')
@observer
class PostPanel extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => this.setState({open: true})

  handleClose = () => this.setState({open: false})

  handleChange = (event) => {
    if (event.target.id === 'user-email') {
      this.setState({email: event.target.value})
    } else if (event.target.id === 'user-password') {
      this.setState({password: event.target.value})
    }
  }

  handleLogin = () => {
    this.setState({open: false})
    doSignInWithEmail(this.state.email, this.state.password)
  }

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
          <SignUp />
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
          <Typography variant="title" className={classes.title}>Sign into your account</Typography>

          <DialogContent className={ classes.details }>
            <TextField
              id="user-email"
              className={classes.textField}
              type="email"
              margin="dense"
              placeholder="Email"
              fullWidth
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <TextField
              id="user-password"
              className={classes.textField}
              type="password"
              margin="dense"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
              autoComplete="current-password"
              variant="outlined"
              fullWidth
            />

            <Button onClick={ this.handleLogin } size="large"
              aria-label="Sign Up with Facebook"
              variant="flat"
              className={classnames(classes.button)}
            >
              Sign In
            </Button>

            <div className="wrap">
              <p className="centre-line"><span>Or</span></p>
            </div>

            <Button onClick={ doSignInWithFacebook } size="large"
              aria-label="Sign Up with Facebook"
              className={classnames(classes.button, classes.fbButton)}
            >
              Sign In with Facebook
            </Button>

            <Button onClick={ doSignInWithGoogle }
              size="large"
              aria-label="Authenticate with Google"
              className={classnames(classes.button, classes.goolButton)}
            >
              Sign In with Google
            </Button>
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
  title: {
    margin: theme.spacing.unit * 2,
    fontWeight: 400
  },
  details: {
    width: 300
  },
  button: {
    textTransform: 'capitalize',
    width: '100%',
    backgroundColor: '#f4f4f4',
  },
  fbButton: {
    color: '#fff',
    marginTop: theme.spacing.unit,
    backgroundColor: blue[700],
    '&:hover': {
      backgroundColor: blue[600]
    },
  },
  goolButton: {
    color: '#fff',
    marginTop: theme.spacing.unit,
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
  textField: {
    marginRight: theme.spacing.unit,
  },
})

export default withMobileDialog({breakpoint: 'xs'})(withStyles(styles)(PostPanel))
