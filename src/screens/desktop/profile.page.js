import React, { Component } from 'react'
import Card from '@material-ui/core/Card'

import GoBackPage from '../../components/gobackpage/GoBackPage'
import Profile from '../../components/profile/Profile'

const style = {
  width: 400,
  height: 480,
  margin: '0 auto',
  marginTop: 20
}

class ProfilePage extends Component {
  render () {
    return <GoBackPage children={
      <Card style={ style }>
        <Profile />
      </Card>
    } />
  }
}

export default ProfilePage
