import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import {
  doSignInWithGoogle,
  doSignInWithFacebook,
} from '../commons/firebase/auth'

class SignUp extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => this.setState({ anchorEl: event.currentTarget })

  handleClose = () => this.setState({ anchorEl: null })

  render() {
    const { anchorEl } = this.state
    const { classes } = this.props

    return (
      <span>
        <Button onClick={ this.handleClick } variant="outlined" className={classes.signupBtn}
          aria-label="Sign Up"
        >
          Sign Up
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={doSignInWithFacebook}>
            Continue With Facebook
          </MenuItem>
          <MenuItem onClick={doSignInWithGoogle}>
            Continue With Google
          </MenuItem>
          <Divider />
          <MenuItem>
            Sign Up With Email
          </MenuItem>
        </Menu>
      </span>
    )
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
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

export default withStyles(styles)(SignUp)
