import React, { Component } from 'react'
import GoBackPage from '../../components/gobackpage/GoBackPage'
import Profile from '../../components/profile/Profile'

const style = {
  height: 'calc(100vh - 55px)'
}

class ProfilePage extends Component {
  render = () => <GoBackPage children={ <div style={style}><Profile /></div> } />
}

export default ProfilePage
