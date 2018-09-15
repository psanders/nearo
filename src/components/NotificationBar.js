import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { observer } from 'mobx-react'
import { notificationsStore } from './stores/notifications'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

@observer
class NotificationBar extends React.Component {

  render() {
    const { classes } = this.props;
    const store = notificationsStore

    const action = [
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={ classes.close }
        onClick={ store.hideNotification }
      >
        <CloseIcon />
      </IconButton>
    ];

    if (store.state.showUndo) {
      const closeAction = action.pop()
      action.push(
        <Button key="undo" disabled={ !store.state.showUndo } color="secondary" size="small"
          onClick={ store.state.undoCallback }>
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
          open={ store.state.open }
          autoHideDuration={4000}
          onClose={ store.hideNotification }
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{ store.state.message }</span>}
          action={ store.state.undoCallback }
        />
      </div>
    );
  }
}

NotificationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationBar);
