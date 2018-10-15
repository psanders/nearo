import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import EditLocationIcon from '@material-ui/icons/LocationOn'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

@inject('appStore')
@inject('usersStore')
@inject('notificationsStore')
@observer
class BNav extends React.Component {
  @computed get value() {
    return this.props.appStore.currentView
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
    this.props.appStore.currentView = value
  }

  render() {
    const { classes } = this.props

    return (
      <BottomNavigation
        value={this.value}
        onChange={this.handleChange}
        className={classes.root}>
        <BottomNavigationAction value="/" icon={<HomeIcon />}  />
        <BottomNavigationAction value="/favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction value="/location" icon={<EditLocationIcon />} />
        <BottomNavigationAction value="/profile" icon={<ProfileIcon />}  />
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
