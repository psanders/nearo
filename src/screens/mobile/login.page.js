import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

import GoBackPage from '../../components/gobackpage/GoBackPage'
import Profile from '../../components/profile/Profile'
import LoginScreen from '../../components/login/Login'

@inject('usersStore')
@observer
class ProfilePage extends Component {
  render () {
    const { classes } = this.props

    return <Fragment>
      {
        this.props.usersStore.isSignedIn() &&
        <div>
          <GoBackPage children={ <Profile /> } />
        </div>
      }
      {
        !this.props.usersStore.isSignedIn() &&
        <div className={classes.container}>
          <GoBackPage children={ <LoginScreen /> } />
        </div>
      }
    </Fragment>
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  container: {
    height: '100vh',
    backgroundColor: theme.palette.primary.light
  }
})

export default withStyles(styles)(ProfilePage)
