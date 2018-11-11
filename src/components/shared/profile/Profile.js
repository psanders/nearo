import React, { Component } from 'react'
import firebase from 'firebase/app'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { observer, inject } from 'mobx-react'

import PhoneInput, { isValidNumber } from './PhoneInput'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import AvatarUpdater from './AvatarUpdater'
import { db, auth } from 'components/commons/firebase/firebase'
import { storeUserInfo } from 'components/commons/dbfunctions'

@inject('usersStore')
@inject('notificationsStore')
@inject('appStore')
@inject('routing')
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
    } else if (event.target.id === 'user-phone') {
      user.phone = event.target.value.trim()
    }  else if (event.target.id === 'user-bio') {
      user.bio = event.target.value
    } else if (event.target.id === 'user-phone-private') {
      user.keepPhonePrivate = event.target.checked
    } else if (event.target.id === 'user-email') {
      user.id = event.target.value
    }

    this.setNoPristine(event.target.id)
  }

  save = () => {
    // Close it first to make it feel faster
    const user = this.props.usersStore.currentUser
    if(user.phone) {
      user.phone = user.phone
        .replace("(","")
        .replace(")","")
        .replace("-","")
        .replace(" ","")
    }

    const jsonUser = JSON.parse(JSON.stringify(user))
    jsonUser.isNewUser = false
    jsonUser.joined = new
      firebase.firestore.Timestamp(user.joined.seconds, user.joined.nanoseconds) // Keep as it is

    const userRef = db.collection("users").doc(user.id)
    userRef.set(jsonUser)

    // Update local DB
    storeUserInfo('user-info', jsonUser)
    this.props.usersStore.setCurrentUser(jsonUser)
    this.props.notificationsStore.showNotification('All set')
    this.props.routing.push('/')
  }

  isInvalid = user => {
    return !user.name
    || user.name.length <= 5
    || !isValidNumber(user.phone)
    || !this.validEmail(user.id)
  }

  alphanumeric = text => text.match(/^[0-9a-zA-Z]+$/) ? true : false

  validEmail = email => /\S+@\S+\.\S+/.test(email)

  isNoPristine = field => this.state.noPristine.get(field)

  setNoPristine = field => {
    const noPristine = this.state.noPristine
    noPristine.set(field, true)
    this.setState({noPristine: noPristine})
  }

  handleEmailReset = (event) => {
    const user = this.props.usersStore.currentUser
    auth.sendPasswordResetEmail(user.id).then(() => {
      this.props.notificationsStore.showNotification('We sent you an email you reset instructions')
    }).catch(error => {
      this.props.notificationsStore.showNotification('Something went wrong. Please try again')
    })
  }

  render() {
    const { classes, usersStore } = this.props
    const user = usersStore.currentUser

    return (<div className={classes.root}>
        <div className={classes.container}>
          <Typography variant="body1" gutterBottom>
            Your Preferences
          </Typography>
          <AvatarUpdater />
          <form noValidate autoComplete="off">
            <TextField
              variant="outlined"
              id="user-name"
              label="Display Name"
              onChange={this.handleChange}
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps= {{
                maxLength: 70,
              }}
              value={ user.name }
              error={this.isNoPristine('user-name') && user.name.length < 3 }
              placeholder="Name"
              fullWidth
            />
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
              variant="outlined"
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps= {{
                maxLength: 128,
              }}
              onChange={this.handleChange}
              className={classes.textField}
              value={user.bio}
            />
            <div className={classes.buttonContainer}>
              <a className={classes.link} onClick={this.handleEmailReset}
                size="small"
                aria-label="Reset Password"
              >
                <Typography variant="caption">Recover Password </Typography>
              </a>
              <span className={classes.flex}/>

              <Button className={classes.button} disabled={ this.isInvalid(user) } onClick={ this.save }
                size="small" variant="outlined" color="primary"
                aria-label="Save Profile"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  arrawBack: {
    color: '#fff'
  },
  logo: {
    color: '#fff'
  },
  root: {
    background: '#fff',
    height: '100%'
  },
  container: {
    padding: theme.spacing.unit
  },
  button: {
    textTransform: 'capitalize',
    marginLeft: theme.spacing.unit
  },
  buttonContainer: {
    display: 'flex'
  },
  flex: {
    flex: 1,
    flexGrow: 1
  },
  textField: {
    marginBottom: 15,
    width: '100%'
  },
  passwordField :{
    width: '305px', /* Why?? */
  },
  link: {
    cursor: 'pointer'
  }
})

export default withStyles(styles)(Profile)
