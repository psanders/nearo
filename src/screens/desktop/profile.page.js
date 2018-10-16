import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import Card from '@material-ui/core/Card'

import GoBackPage from '../../components/gobackpage/GoBackPage'
import Profile from '../../components/profile/Profile'
import Login from '../../components/login/Login'

const style = {
  width: 400,
  margin: '0 auto',
  marginTop: 20,
  height: 510
}

@inject('usersStore')
@observer
class ProfilePage extends Component {
  render () {
    return <Fragment>
      { this.props.usersStore.isSignedIn() &&
        <Card style={style}>
          <GoBackPage children={ <Profile /> } />
        </Card>
      }
      { !this.props.usersStore.isSignedIn() && <GoBackPage children={ <Login /> } /> }
    </Fragment>
  }
}

export default ProfilePage
