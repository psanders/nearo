import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { doSignInWithGoogle, doSignInWithFacebook } from '../firebase/auth';
import red from '@material-ui/core/colors/red';

class ResponsiveDialog extends React.Component {
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
          <DialogActions>
            <IconButton onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <Button onClick={() => doSignInWithGoogle()} variant="contained" style={{backgroundColor: red[500], width: 200}}>
               Login with Google
             </Button>
             <br/>
             <br/>
            <Button onClick={() => doSignInWithFacebook()}  variant="contained" color="secondary" style={{width: 200}}>
               Login with Facebook
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);
