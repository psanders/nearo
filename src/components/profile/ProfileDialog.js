import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ProfileDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MenuItem onClick={this.handleClickOpen}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Profile Settings
        </MenuItem>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar} >
            <Toolbar color="secondary" style={{backgroundColor: '#dae0e6'}}>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Nearo
              </Typography>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <Avatar className={classes.avatar}
                style={{height: 35, width: 35}}
                alt={"Pedro Sanders"}
                src={"https://lh5.googleusercontent.com/-PnN3kxCPIKo/AAAAAAAAAAI/AAAAAAAAA4I/wdUgAlKPDjA/photo.jpg"}  />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{backgroundColor: '#dae0e6', width: '100%', height: '100%'}}>
            <div style={{margin: 'auto', width: '360px', height: 300}}>
              <Paper style={{height: 300, padding: 35}}>

                <Typography variant="title" gutterBottom>
                  Settings
                </Typography>
                <TextField
                  id="full-width"
                  label="Display Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Placeholder"
                  helperText="This is what other users will see in your posts"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="full-width"
                  label="Phone"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="000-000-000"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="full-width"
                  label="Phone"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  value="your@email.com"
                  placeholder="your@email.com"
                  fullWidth
                  margin="normal"
                />
              </Paper>
              <Typography variant="caption" style={{marginTop: 5}} align="center">
                We will not annoy you with push notification if you are currently online via web/desktop.
                We also throttle noisy conversation.
              </Typography>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

ProfileDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileDialog);
