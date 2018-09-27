import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import NotificationBar from '../NotificationBar'
import PhoneInput from './PhoneInput'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { db, auth } from '../commons/firebase/firebase'
import { storeUserInfo } from '../commons/dbfunctions'

@inject('usersStore')
@inject('notificationsStore')
@withRouter
@observer
class Profile extends Component {
  state = {
    password: '',
    noPristine: new Map(),
    showPassword: false
  }

  handleChange = event => {
    const user = this.props.usersStore.currentUser

    if (event.target.id === 'user-name') {
      user.name = event.target.value
    } else if (event.target.id === 'user-username') {
      user.username = event.target.value
    } else if (event.target.id === 'user-phone') {
      user.phone = event.target.value.trim()
    }  else if (event.target.id === 'user-bio') {
      user.bio = event.target.value
    } else if (event.target.id === 'user-phone-private') {
      user.keepPhonePrivate = event.target.checked
    } else if (event.target.id === 'user-email') {
      user.email = event.target.value
    } else if (event.target.id === 'user-password') {
      this.setState({password: event.target.value})
    }

    this.setNoPristine(event.target.id)
  }

  save = () => {
    // Close it first to make it feel faster
    const user = this.props.usersStore.currentUser
    if (this.props.mode === "CREATE") {
      user.isNewUser = true
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
    if (this.props.mode === "CREATE") {
      auth.createUserWithEmailAndPassword(user.email, this.state.password)
      .then(() => {
        this.reallyReallySave(user)
      })
      .catch(error => {
        this.props.notificationsStore.showNotification(error.message)
      })
    } else {
      this.reallyReallySave(user)
    }
  }

  reallyReallySave = user => {
    const jsonUser = JSON.parse(JSON.stringify(user))
    // Update remote DB
    const userRef = db.collection("users").doc(user.email)
    jsonUser.isNewUser = false
    userRef.set(jsonUser)

    // Update local DB
    storeUserInfo('user-info', jsonUser)
    this.props.usersStore.setCurrentUser(jsonUser)
    this.props.notificationsStore.showNotification('All set.')
    this.props.history.push('/')
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
    || !this.validEmail(user.email)
  }

  alphanumeric = (text) => {
    const letters = /^[0-9a-zA-Z]+$/
    return text.match(letters) ? true : false
  }

  isNoPristine = (field) => this.state.noPristine.get(field)

  setNoPristine = (field) => {
    const noPristine = this.state.noPristine
    noPristine.set(field, true)
    this.setState({noPristine: noPristine})
  }

  validEmail = (email) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  handleGoBack= () => {
    if (this.props.usersStore.currentUser.isNewUser) {
      this.props.usersStore.doSignOut()
      this.props.notificationsStore.showNotification("Please complete your profile to enjoy all the features.")
    }
    this.props.history.push('/')
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes, mode, usersStore } = this.props
    const user = usersStore.currentUser
    const creating = mode === "CREATE" ? true : false

    return (
      <div>
        <AppBar className={classes.appBar} >
          <Toolbar color="secondary" >
            <IconButton color="inherit" onClick={ this.handleGoBack } aria-label="Close">
              <ArrowBackIcon style={{ color: '#fff' }} />
            </IconButton>
            <Typography variant="title" style={{ color: '#fff' }} className={classes.flex}>
              ListQ
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
              <form className={classes.container} noValidate autoComplete="off">
                <Typography variant="title" gutterBottom>
                  User Profile
                </Typography>
                <TextField
                  autoFocus
                  variant="outlined"
                  id="user-name"
                  label="Display Name"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={ user.name }
                  error={this.isNoPristine('user-name') && user.name.length < 3 }
                  placeholder="Name"
                  fullWidth
                  margin="dense"
                />
                {creating && <TextField
                  variant="outlined"
                  id="user-email"
                  label="Email"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={ user.email }
                  error={ this.isNoPristine('user-email') && !this.validEmail(user.email) }
                  placeholder="Email"
                  fullWidth
                  margin="dense"
                />}
                { <TextField
                  className={classes.passwordField}
                  variant="outlined"
                  id="user-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  label="Password"
                  onChange={this.handleChange}
                  value={ this.state.password }
                  error={ this.isNoPristine('user-password') && this.state.password.length < 7 }
                  placeholder="Password"
                  fullWidth
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />}
                {
                  (user.isNewUser || creating) &&
                  <TextField
                    variant="outlined"
                    id="user-username"
                    label="Username"
                    disabled={!user.isNewUser && !creating}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={user.username}
                    error={this.isNoPristine('user-username') && this.isInvalidUser(user)}
                    fullWidth
                    placeholder="Must be alphanumeric"
                    margin="dense"
                  />
                }
                {user && <PhoneInput
                  id="user-phone"
                  value={user.phone}
                  onChange={this.handleChange}
                />}

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
                  margin="dense"
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
              </form>
            </Paper>
            <Typography variant="caption" style={{marginTop: 5}} align="center">
              We will not annoy you with push notification if you are currently online via web/desktop.
              We also throttle noisy conversation.
            </Typography>
          </div>
        </div>
        <NotificationBar />
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  flex: {
    flex: 1,
  },
  textField: {
    width: '292px', /* Why?? */
    marginBottom: 15
  },
  passwordField :{
    width: '305px', /* Why?? */
  }
})

export default withStyles(styles)(Profile)
