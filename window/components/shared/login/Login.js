import React, { Component } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import { observer, inject } from 'mobx-react'
import 'firebase/auth'
import firebaseui from 'firebaseui'

import { createUser } from 'components/commons/firebase/newaccount'

const uiConfig = (self) => {

  return {
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
          window.gtag('event', 'signup', {
            'event_category': 'Engagement',
            'event_label': 'Signup'
          })
          window.fbq('trackCustom', 'signup')
        }
        // Let Router take care of the navigation
        //if(window.history.length < 4) {
        self.props.routing.push('/')
        //} else {
        //  self.props.routing.goBack()
        //  self.props.routing.goBack()
        //}
        return false
      },
      signInFailure: function(error) {
        console.error(error.message)
    },
  }
}}

@inject('routing')
@observer
class LoginScreen extends Component {
  render() {
    //const hideBar = () => document.getElementsByClassName("firebaseui-idp-list").length > 0
    //  ? false
    //  : true

    return <StyledFirebaseAuth
      style={{height: '100vh'}}
      uiCallback={ui => ui.disableAutoSignIn()}
      uiConfig={uiConfig(this)}
      firebaseAuth={firebase.auth()} />
  }
}

export default LoginScreen
