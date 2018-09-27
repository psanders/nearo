import React, {Component} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  db
} from '../commons/firebase/firebase'

import firebaseui from 'firebaseui';

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      authMethod: 'https://accounts.google.com',
      // Required to enable ID token credentials for this provider.
      // This can be obtained from the Credentials page of the Google APIs
      // console.
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
      if (authResult.user && authResult.additionalUserInfo.isNewUser) {
        console.log('user', JSON.stringify(authResult.user))
        const picture = authResult.user.photoURL !== null
          ? authResult.user.photoURL
          : "/images/default-avatar.png"

        const user = {
          id: authResult.user.email,
          name: authResult.user.displayName,
          picture: picture,
          isNewUser: true
        }

        const userRef = db.collection('users')
        userRef.doc(user.id).set(user)
      }
      return true
    }
  }
};

class LoginScreen extends Component {
  render() {
    return (
      <div style={{height: '100vh'}}>
        <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}

export default LoginScreen
