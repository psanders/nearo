import React, { Component } from 'react'
import GoBackPage from '../../components/shared/gobackpage/GoBackPage'
import Profile from '../../components/shared/profile/Profile'

const style = {
  height: 'calc(100vh - 55px)'
}

class ProfilePage extends Component {
  render = () => <GoBackPage children={ <div style={style}><Profile /></div> } />
}

export default ProfilePage
