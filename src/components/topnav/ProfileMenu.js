import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ExitIcon from '@material-ui/icons/ExitToApp';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ProfileDialog from '../profile/ProfileDialog';
import { doSignOut } from '../commons/firebase/auth';
import { auth } from '../commons/firebase/firebase';

const styles = ({
  avatar: {
    width: 30,
    height: 30,
  }
})

class ProfileMenu extends React.Component {

  constructor(props, context) {
      super(props, context);
      this.state = {
          anchorEl: null,
          user: null
      };
  }

  componentWillMount() {
      auth.onAuthStateChanged(user => {
          this.setState({user: user});
      });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Button
        size="small"
        aria-owns={anchorEl ? 'simple-menu' : null}
        aria-haspopup="true"
          onClick={this.handleClick} color="inherit"  aria-label="Check Messages">
          { this.state.user && <Avatar className={classes.avatar}
            style={{height: 26, width: 26}}
            alt={this.state.user.displayName}
            src={this.state.user.photoURL}  /> }
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <ProfileDialog>Profile</ProfileDialog>
          <MenuItem onClick={() => doSignOut()}>
            <ListItemIcon className={classes.icon}>
              <ExitIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

ProfileMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileMenu);
