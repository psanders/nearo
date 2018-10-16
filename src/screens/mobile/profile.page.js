import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'

import GoBackPage from '../../components/gobackpage/GoBackPage'
import Profile from '../../components/mobprofile/Profile'
import LoginScreen from '../../components/profile/LoginScreen'

@inject('usersStore')
@observer
class ProfilePage extends Component {
  render () {
    return <Fragment>
      { this.props.usersStore.isSignedIn() && <GoBackPage children={ <Profile /> } /> }
      { !this.props.usersStore.isSignedIn() && <GoBackPage children={ <LoginScreen /> } /> }
    </Fragment>
  }
}

export default ProfilePage
