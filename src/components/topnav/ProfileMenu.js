import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import ExitIcon from '@material-ui/icons/ExitToApp'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { observer } from 'mobx-react'

import ProfileDialog from '../profile/ProfileDialog'
import { doSignOut } from '../commons/firebase/auth'

const styles = ({
  avatar: {
    width: 30,
    height: 30,
  }
})

@observer
class ProfileMenu extends React.Component {
  state = {
      anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const { classes, usersStore } = this.props
    const user = usersStore.currentUser

    return (
      <div>
        <Button
          style={{ marginLeft: 5 }}
          size="small"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick} color="inherit" aria-label="Open Profile Menu">
          { user && <Avatar className={classes.avatar}
            style={{height: 35, width: 35}}
            alt={user.name}
            src={user.picture}  /> }
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <ProfileDialog usersStore={ usersStore }>Profile</ProfileDialog>
          <MenuItem onClick={() => doSignOut()}>
            <ListItemIcon className={classes.icon}>
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
