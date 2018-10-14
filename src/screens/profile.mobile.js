import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'

import Profile from '../components/profile/Profile'
import LoginScreen from '../components/profile/LoginScreen'

@inject('usersStore')
@observer
class ProfilePage extends Component {
  render () {
    return <Fragment>
      { this.props.usersStore.isSignedIn() && <Profile /> }
      { !this.props.usersStore.isSignedIn() && <LoginScreen /> }
    </Fragment>
  }
}

export default ProfilePage
