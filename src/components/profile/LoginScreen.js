import React, { Component } from 'react'
import Hidden from '@material-ui/core/Hidden'
import { withRouter } from 'react-router-dom'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import 'firebase/auth'
import firebaseui from 'firebaseui'

import { createUser } from '../commons/firebase/newaccount'

const uiConfig = (self) => {

  return {
    signInFlow: 'redirect',
    signInSuccessUrl: '/explore',
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        authMethod: 'https://accounts.google.com',
        clientId: '225376231981-m0a8otu93ha2btftd05vku6kob7nidr4.apps.googleusercontent.com'
      },
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    //credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO, // Activating this is causing issues in mobiles
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    callbacks: {
      uiShown: function() {
        // This is need but I don't know way
        self.setState({loading: false})
      },
      signInSuccessWithAuthResult: (authResult, redirectUrl = "/") => {
        if (authResult.user && authResult.additionalUserInfo.isNewUser) {
          createUser(authResult)
        }
        // Let Router take care of the navigation
        self.props.history.push('/')
        return false
      },
      signInFailure: function(error) {
        console.error(error.message)
    },
  }
}}

@withRouter
class LoginScreen extends Component {

  render() {
    const hideBar = () => document.getElementsByClassName("firebaseui-idp-list").length > 0
      ? false
      : true

    return (
      <div>
        <Hidden xsDown={true}>
        { !hideBar() && <AppBar>
          <Toolbar color="secondary" >
            <IconButton color="inherit" onClick={ this.props.history.goBack } aria-label="Close">
              <ArrowBackIcon style={{ color: '#fff' }} />
            </IconButton>
            <Typography variant="title" style={{ color: '#fff' }}>
              Nearo
            </Typography>
          </Toolbar>
        </AppBar>
        }
        </Hidden>
        <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig(this)} firebaseAuth={firebase.auth()} />
      </div>
    )
  }
}

export default LoginScreen
