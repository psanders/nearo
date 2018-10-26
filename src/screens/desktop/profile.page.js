import React from 'react'
import Card from '@material-ui/core/Card'

import GoBackPage from 'components/shared/gobackpage/GoBackPage'
import Profile from 'components/shared/profile/Profile'

const style = {
  width: 400,
  height: 480,
  margin: '0 auto',
  marginTop: 20
}

const ProfilePage = () => <GoBackPage
  children={
    <Card style={ style } elevation={0}>
      <Profile />
    </Card>
  }
/>

export default ProfilePage
