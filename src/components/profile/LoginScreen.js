import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import 'firebase/auth';
import firebaseui from 'firebaseui';

import { createUser } from '../commons/firebase/newaccount'

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      authMethod: 'https://accounts.google.com',
      clientId: '225376231981-m0a8otu93ha2btftd05vku6kob7nidr4.apps.googleusercontent.com'
    },
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (authResult, redirectUrl = "/") => {
      if (authResult.user && authResult.additionalUserInfo.isNewUser) {
        return createUser(authResult)
      } else {
        return true
      }
    },
    signInFailure: function(error) {
      console.log(error.message)
    },
  }
}

@withRouter
class LoginScreen extends Component {
  render() {
    return (
      <div style={{height: '100vh'}}>
      <AppBar  >
          <Toolbar color="secondary" >
            <IconButton color="inherit" onClick={ () => this.props.history.push('/') } aria-label="Close">
              <ArrowBackIcon style={{ color: '#fff' }} />
            </IconButton>
            <Typography variant="title" style={{ color: '#fff' }}>
              ListQ
            </Typography>
          </Toolbar>
        </AppBar>
        <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}

export default LoginScreen
