import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import { observer, inject } from 'mobx-react'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  callBackBtn: {
    color: theme.palette.accent.main
  }
})

@inject('notificationsStore')
@observer
class NotificationBar extends Component {

  render() {
    const store = this.props.notificationsStore
    const { classes } = this.props

    const action = [
      <Button className={ classes.callBackBtn } key="close"  size="small" onClick={ store.hideNotification }>
        <CloseIcon />
      </Button>
    ]

    if (store.state.callback) {
      action.pop()
      action.push(
        <Button className={ classes.callBackBtn } key="callback" disabled={ !store.state.callback } color="secondary" size="small"
          onClick={ ()=> {
            store.state.callback()
            store.hideNotification()
          }}>
            {store.state.callbackLabel}
          </Button>
        )
      //action.push(closeAction)
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={ store.state.open }
          autoHideDuration={store.state.timeout}
          onClose={ store.hideNotification }
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{ store.state.message }</span>}
          action={ action }
        />
      </div>
    )
  }
}

NotificationBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NotificationBar)
