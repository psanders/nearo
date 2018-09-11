import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import SettingsIcon from '@material-ui/icons/Settings'
import PhoneInput from './PhoneInput'
import { db } from '../commons/firebase/firebase'
import { storeUserInfo } from '../commons/dbfunctions'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
}

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class ProfileDialog extends React.Component {
  state = {
    open: false,
    user: this.props.user
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = event => {
    console.log('event.target.id', event.target.id )
    console.log('value', event.target.value )
    const user = this.state.user
    if (event.target.id === 'user-name') {
      user.name = event.target.value
    } else if (event.target.id === 'user-phone') {
      user.phone = event.target.value
    }
    this.setState({ user: user})
  }

  save = () => {
    // Close it first to make it feel faster
    this.handleClose()
    const user = this.state.user
    user.phone = user.phone
      .replace("(","")
      .replace(")","")
      .replace("-","")
      .replace(" ","")
    const userRef = db.collection("users").doc(user.email)
    userRef.set(user)
    storeUserInfo('user-info', user)
  }

  isNotValid = user => !user.name
    || !user.phone
    || user.name.length < 3
    || user.phone.trim().length < 10

  render() {
    const { classes } = this.props
    const { user} = this.state

    return (
      <div>
        <MenuItem onClick={this.handleClickOpen}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Profile Settings
        </MenuItem>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar} >
            <Toolbar color="secondary" style={{backgroundColor: '#dae0e6'}}>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Nearo
              </Typography>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <Avatar className={classes.avatar}
                style={{height: 35, width: 35}}
                alt={user.name}
                src={user.picture}  />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{backgroundColor: '#dae0e6', width: '100%', height: '100%'}}>
            <div style={{margin: 'auto', width: '360px', height: 300}}>
              <Paper style={{height: 300, padding: 35}}>
                <Typography variant="title" gutterBottom>
                  Settings
                </Typography>
                <TextField
                  id="user-name"
                  label="Display Name"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={user.name}
                  placeholder="Name"
                  fullWidth
                  margin="normal"
                />
                <PhoneInput
                  id="user-phone"
                  value={user.phone}
                  onChange={this.handleChange}
                />
                <TextField
                  id="user-email"
                  label="Email"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  value={user.email}
                  placeholder="your@email.com"
                  fullWidth
                  margin="normal"
                />
                <Button disabled={ this.isNotValid(user) } onClick={ this.save } size="small" variant="contained" color="secondary">
                  Save
                </Button>
              </Paper>
              <Typography variant="caption" style={{marginTop: 5}} align="center">
                We will not annoy you with push notification if you are currently online via web/desktop.
                We also throttle noisy conversation.
              </Typography>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

ProfileDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileDialog)
