import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { doSignInWithGoogle, doSignInWithFacebook } from '../firebase/auth';
import red from '@material-ui/core/colors/red';

class LoginDialog extends React.Component {
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
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
        <div style={{padding: 100}}>
          <Button onClick={() => doSignInWithGoogle()} variant="contained" style={{color: '#FFFFFF', backgroundColor: red[500], width: 200}}>
             Login with Google
          </Button>
          <div style={{marginBottom: 20}}/>
          <Button onClick={() => doSignInWithFacebook()}  variant="contained" color="secondary" style={{width: 200}}>
            Login with Facebook
          </Button>
        </div>
        </Dialog>
      </div>
    );
  }
}

LoginDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(LoginDialog);
