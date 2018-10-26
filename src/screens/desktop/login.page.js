import React, { Component } from 'react'
import GoBackPage from 'components/shared/gobackpage/GoBackPage'
import Login from 'components/shared/login/Login'

class ProfilePage extends Component {
  render = () => <GoBackPage children={ <Login /> } />
}

export default ProfilePage
