import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import EditLocationIcon from '@material-ui/icons/LocationOn'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MenuIcon from '@material-ui/icons/Menu'
import HelpIcon from '@material-ui/icons/Help'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import orange from '@material-ui/core/colors/orange'
import purple from '@material-ui/core/colors/purple'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

@inject('routing')
@inject('appStore')
@inject('usersStore')
@inject('navStore')
@inject('notificationsStore')
@observer
class SwipeableTemporaryDrawer extends Component {
  state = {
    open: false
  }

  @computed get currentView() {
    return this.props.routing.location.pathname
  }

  @computed get signedIn() {
    return this.props.usersStore.signedIn
  }

  logout = () => this.props.usersStore.doSignOut()

  navigate = value => {
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

  changeCategory = value => {
    this.props.navStore.navInfo.searchTerm = value
    this.props.routing.push('/')
  }

  toggleDrawer = () => {
    const open = !this.state.open
    this.setState({open: open})
  }

  render() {
    const { classes } = this.props

    const list = (
      <div className={classes.list}>
        <List>
          <ListItem button onClick={() => this.navigate('/')}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {
            this.props.usersStore.isSignedIn() &&
            <ListItem button onClick={() => this.navigate('/profile')}>
              <ListItemIcon><ProfileIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          }
          {
            !this.props.usersStore.isSignedIn() &&
            <ListItem button onClick={() => this.navigate('/profile')}>
              <ListItemIcon><ProfileIcon /></ListItemIcon>
              <ListItemText primary="Sign In / Register" />
            </ListItem>
          }
          <ListItem button onClick={() => this.navigate('/favorites')}>
            <ListItemIcon><FavoriteIcon /></ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
          <ListItem button onClick={() => this.navigate('/location')}>
            <ListItemIcon><EditLocationIcon /></ListItemIcon>
            <ListItemText primary="Change Location" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={ () => this.navigate('/about') }>
            <ListItemIcon><HelpIcon /></ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          { this.props.usersStore.isSignedIn() &&
            <ListItem button onClick={ this.logout }>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          }
        </List>
      </div>
    )

    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={this.toggleDrawer}
          className={classNames(classes.menuButton, this.state.open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="right"
          open={this.state.open}
          onClose={this.toggleDrawer}
          onOpen={this.toggleDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            {list}
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  list: {
    width: 250,
  },
  menuButton: {
  },
  hide: {
    display: 'none',
  },
  housingLabel: {
    color: orange[500]
  },
  carsLabel: {
    color: green[500]
  },
  eventsLabel: {
    color: red[500]
  },
  servicesLabel: {
    color: purple[500]
  }
})

export default withStyles(styles)(SwipeableTemporaryDrawer)
