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
import {
  db
} from '../commons/firebase/firebase'
import firebaseui from 'firebaseui';

import { openURL } from '../commons/utils'

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
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (authResult, redirectUrl = "/") => {
      console.log(authResult)
      if (authResult.user && authResult.additionalUserInfo.isNewUser) {
        const picture = authResult.user.photoURL !== null
          ? authResult.user.photoURL
          : "/images/default-avatar.png"

        const user = {
          id: authResult.user.email,
          name: authResult.user.displayName,
          picture: picture,
          isNewUser: true,
          username: authResult.user.displayName.replace(/\W/g, '').toLowerCase()
        }

        const userRef = db.collection('users')
        userRef.doc(user.id).set(user).then(() =>{
          openURL('/profile')
        })
        .catch(error => {
          console.log(error)
        })
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
