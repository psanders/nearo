import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { observer, inject } from 'mobx-react'

@inject('notificationsStore')
@observer
class NotificationBar extends Component {

  handleCallback = () => {
    this.props.notificationsStore.state.callback()
    this.props.notificationsStore.hideNotification()
  }

  render() {
    const store = this.props.notificationsStore
    const { classes } = this.props
    let action

    if (store.state.callback !== null) {
      action = <Button className={ classes.callBackBtn }
        aria-label="Action"
        size="small" onClick={ this.handleCallback }>
        { '' + store.state.callbackLabel }
      </Button>
    } else {
      action = <IconButton className={ classes.closeBtn }
        aria-label="Close"
        size="small" onClick={ this.props.notificationsStore.hideNotification }>
        <CloseIcon />
      </IconButton>
    }

    return <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        open={ store.state.open }
        autoHideDuration={ store.state.timeout }
        onClose={ store.hideNotification }
        ContentProps={{ 'aria-describedby': 'message-id' }}
        message={ <span id="message-id">{ store.state.message }</span> }
        action={ store.state.callback && action }
      />
  }
}

NotificationBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = theme => ({
  callBackBtn: {
    color: theme.palette.accent.main,
    margin: theme.spacing.unit
  },
  closeBtn: {
    color: '#f4f4f4',
    margin: theme.spacing.unit
  }
})

export default withStyles(styles)(NotificationBar)
