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
        <GoBackPage children={
          <div className={classes.root}>
            <div className={classes.container}>
              <img className={classes.illustration} src="https://image.flaticon.com/icons/svg/149/149071.svg" />
              <LoginScreen />
            </div>
          </div>
        } />
      }
    </Fragment>
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 55px)',
  },
  container: {
    width: 260
  },
  illustration: {
    width: 80,
    marginLeft: 85,
    marginBottom: theme.spacing.unit
  }
})

export default withStyles(styles)(ProfilePage)
