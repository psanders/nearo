import React, { Component } from 'react'
import GoBackPage from '../../components/gobackpage/GoBackPage'
import Login from '../../components/login/Login'

class ProfilePage extends Component {
  render = () => <GoBackPage children={ <Login /> } />
}

export default ProfilePage
