import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined'
import EditLocationIcon from '@material-ui/icons/LocationOnOutlined'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

@inject('appStore')
@inject('usersStore')
@inject('notificationsStore')
@observer
class BNav extends React.Component {
  @computed get value() {
    return this.props.appStore.currentView()
  }

  @computed get signedIn() {
    return this.props.usersStore.signedIn
  }

  handleChange = (event, value) => {
    if (!this.signedIn && value === '/favorites') {
      this.props.notificationsStore.showMustLogin(()=> {
        this.props.appStore.currentView = '/profile'
      })
      return
    }
    this.props.appStore.currentView(value)
  }

  render() {
    const { classes } = this.props

    return (
      <BottomNavigation
        showLabels
        value={this.value}
        onChange={this.handleChange}
        className={classes.root}>
        <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />}  />
        <BottomNavigationAction label="Favorites" value="/favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Location" value="/location" icon={<EditLocationIcon />} />
        <BottomNavigationAction label="Profile" value="/profile" icon={<ProfileIcon />}  />
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
    top: 'calc(100vh - 55px)'
  },
}

export default withStyles(styles)(BNav)
