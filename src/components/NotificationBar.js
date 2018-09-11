import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class NotificationBar extends React.Component {

  render() {
    const { classes, message, open, handleClose, handleUndo, showUndo} = this.props;
    const action = [
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={ classes.close }
        onClick={ handleClose }
      >
        <CloseIcon />
      </IconButton>
    ];

    if (showUndo) {
      const closeAction = action.pop()
      action.push(
        <Button key="undo" disabled={ !showUndo } color="secondary" size="small" onClick={ handleUndo }>
            UNDO
          </Button>
        );
      action.push(closeAction);
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={ open }
          autoHideDuration={4000}
          onClose={ handleClose }
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{ message }</span>}
          action={ action }
        />
      </div>
    );
  }
}

NotificationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationBar);
