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
import { observer, inject } from 'mobx-react'
import NotificationBar from '../NotificationBar'
import PhoneInput from './PhoneInput'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import { db } from '../commons/firebase/firebase'
import { storeUserInfo } from '../commons/dbfunctions'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  textField: {
    width: '292px', /* Why?? */
    marginBottom: 15
  },
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

@inject('usersStore')
@inject('notificationsStore')
@observer
class ProfileDialog extends React.Component {

  handleClickOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false })

  handleChange = event => {
    const user = this.props.usersStore.currentUser
    if (event.target.id === 'user-name') {
      user.name = event.target.value
    } else if (event.target.id === 'user-phone') {
      user.phone = event.target.value.trim()
      console.log('event.target.value.trim()', event.target.value.trim())
    } else if (event.target.id === 'user-username') {
      user.username = event.target.value
    } else if (event.target.id === 'user-bio') {
      user.bio = event.target.value
    } else if (event.target.id === 'user-phone-private') {
      console.log('CB', event.target.checked)
      user.keepPhonePrivate = event.target.checked
    }
    this.setState({ user: user})
  }

  save = () => {
    // Close it first to make it feel faster
    const user = this.props.usersStore.currentUser
    if (!user.isNewUser) {
      this.handleClose()
    }
    user.phone = user.phone
      .replace("(","")
      .replace(")","")
      .replace("-","")
      .replace(" ","")

    if (user.isNewUser) {
      db.collection("users")
        .where("username", "==", user.username)
        .get()
        .then(querySnapshot => {
          if(querySnapshot.empty) {
            this.reallySave(user)
            this.handleClose()
          } else {
            this.props.notificationsStore
              .showNotification('Sorry, this username is taken. Try a different one')
          }
      })
    } else {
      this.reallySave(user)
    }
  }

  reallySave = (user) => {
    const jsonUser = JSON.parse(JSON.stringify(user))
    const userRef = db.collection("users").doc(user.email)
    jsonUser.isNewUser = false
    userRef.set(jsonUser)
    storeUserInfo('user-info', jsonUser)
    this.setState({user: jsonUser})
    this.props.usersStore.setCurrentUser(jsonUser)
  }

  isInvalidUser = user => {
    if (user.username.length <= 5 || !this.alphanumeric(user.username)){
      return true
    }
    return false
  }

  isValidNumber = (number) => {
    if (!number) return false

    return number
      .replace("(","")
      .replace(")","")
      .replace("-","")
      .replace(" ","").trim().length === 10
  }

  isInvalid = user => {
    return !user.name
    || !user.phone
    || user.name.length <= 5
    || !this.isValidNumber(user.phone)
    || this.isInvalidUser(user)
  }

  alphanumeric = (text) => {
    const letters = /^[0-9a-zA-Z]+$/
    return text.match(letters) ? true : false
  }

  render() {
    const { classes } = this.props
    const user = this.props.usersStore.currentUser

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
          open={this.state.open || (user.isNewUser)}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar} >
            <Toolbar color="secondary" >
              {
                !user.isNewUser &&
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <ArrowBackIcon style={{ color: '#fff' }} />
                </IconButton>
              }
              <Typography variant="title" style={{ color: '#fff' }} className={classes.flex}>
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
          <div style={{backgroundColor: '#dae0e6', height: '100vh', width: '100vw'}}>
            <div style={{margin: 'auto', height: '100vh', width: 360}}>
              <Paper style={{padding: 20, borderTopRightRadius: 0, borderTopLeftRadius: 0}}>
                <Typography variant="title" gutterBottom>
                  Settings
                </Typography>
                <TextField
                  variant="outlined"
                  id="user-name"
                  label="Display Name"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={ user.name }
                  error={ user.name.length < 3 }
                  placeholder="Name"
                  fullWidth
                  margin="normal"
                />
                {
                  user.isNewUser &&
                  <TextField
                    variant="outlined"
                    id="user-username"
                    label="Username"
                    disabled={!user.isNewUser}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={user.username}
                    error={this.isInvalidUser(user)}
                    fullWidth
                    helperText="Must be alphanumeric"
                    margin="normal"
                  />
                }
                <PhoneInput
                  id="user-phone"
                  value={user.phone}
                  onChange={this.handleChange}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      id="user-phone-private"
                      checked={user.keepPhonePrivate}
                      onChange={this.handleChange}
                      color="primary"
                    />
                  }
                  label="Keep Phone Private"
                />

                <TextField
                  id="user-bio"
                  label="About"
                  multiline
                  rows="4"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  inputProps= {{
                    maxLength: 128,
                  }}
                  onChange={this.handleChange}
                  className={classes.textField}
                  value={ user.bio }
                />

                <Button disabled={ this.isInvalid(user) } onClick={ this.save }
                  size="small" variant="contained" color="secondary"
                  aria-label="Save Profile"
                >
                  Save
                </Button>
              </Paper>
              <Typography variant="caption" style={{marginTop: 5}} align="center">
                We will not annoy you with push notification if you are currently online via web/desktop.
                We also throttle noisy conversation.
              </Typography>
            </div>
          </div>
          <NotificationBar />
        </Dialog>
      </div>
    )
  }
}

ProfileDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileDialog)
