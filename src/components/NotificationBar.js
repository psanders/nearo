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

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={ open }
          autoHideDuration={4000}
          onClose={e => handleClose(e)}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <Button key="undo" disabled={!showUndo} color="secondary" size="small" onClick={handleUndo}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={ e => handleClose(e)}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

NotificationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationBar);
