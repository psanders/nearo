import React from 'react'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ExitIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

import { commonSyles } from 'components/shared/styles/styles'
import { styles } from './styles'

@inject('usersStore')
@inject('appStore')
@inject('routing')
@inject('notificationsStore')
@observer
class ProfileMenu extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    if (!this.props.usersStore.isSignedIn()) {
      this.props.notificationsStore.showMustLogin(() => {
        this.props.routing.push('/profile')
      })
      return
    }
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => this.setState({ anchorEl: null })

  handleSignOut = () => {
    this.props.usersStore.doSignOut()
    this.props.routing.push('/')
  }

  render() {
    const { anchorEl } = this.state
    const { classes, routing } = this.props

    return (
      <div>
        <IconButton
          style={{ marginLeft: 5 }}
          size="small"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick} color="inherit" aria-label="Open Profile Menu">
          <SettingsIcon style={commonSyles.clrWhite} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={ () => routing.push('/profile') } >
            <ListItemIcon className={classes.icon} >
              <SettingsIcon />
            </ListItemIcon>
            Profile Settings
          </MenuItem>
          <MenuItem onClick={this.handleSignOut} >
            <ListItemIcon className={classes.icon} >
              <ExitIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

ProfileMenu.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileMenu)
