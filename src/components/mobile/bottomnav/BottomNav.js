  import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined'
import LoginIcon from '@material-ui/icons/Fingerprint'
import EditLocationIcon from '@material-ui/icons/LocationOnOutlined'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

@inject('routing')
@inject('appStore')
@inject('usersStore')
@inject('notificationsStore')
@observer
class BNav extends Component {
  @computed get currentView() {
    return this.props.routing.location.pathname
  }

  @computed get signedIn() {
    return this.props.usersStore.signedIn
  }

  handleChange = (event, value) => {
    if (!this.signedIn && value === '/favorites') {
      this.props.notificationsStore.showMustLogin(()=> {
        this.props.routing.push('/login')
      })
      return
    }

    if(value === '/profile' && !this.signedIn) {
      this.props.routing.push('/login')
      return
    }

    this.props.routing.push(value)
  }

  render() {
    const { classes, appStore, usersStore } = this.props

    return (
      <BottomNavigation
        showLabels
        value={this.currentView}
        onChange={this.handleChange}
        className={classes.root}>
          { appStore.isReady() && <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />}  /> }
          {
            appStore.isReady() &&
            usersStore.isSignedIn() &&
            <BottomNavigationAction label="Favorites" value="/favorites" icon={<FavoriteIcon />} />
          }
          { appStore.isReady() && <BottomNavigationAction label="Location" value="/location" icon={<EditLocationIcon />} /> }
          {
            appStore.isReady() &&
            usersStore.isSignedIn() &&
            <BottomNavigationAction label="Profile" value="/profile" icon={<ProfileIcon />}  />
          }
          {
            appStore.isReady() &&
            !usersStore.isSignedIn() &&
            <BottomNavigationAction label="Sign In" value="/login" icon={<LoginIcon />}  />
          }
      </BottomNavigation>
    )
  }
}

BNav.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = {
  root: {
    width: '100vw',
    position: 'fixed',
    bottom: 0
  },
}

export default withStyles(styles)(BNav)
