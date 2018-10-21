import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

import LoginNotification from './LoginNotification'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
})

@inject('notificationsStore')
@inject('appStore')
@observer
class Notifier extends Component {
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.props.notificationsStore.hideLoginNotification = true
  }

  render() {
    const { notificationsStore, widthWith, withOrigin } = this.props
    const defaultOrigin = { vertical: 'bottom', horizontal: 'left' }
    const anchorOrigin = withOrigin? withOrigin : defaultOrigin

    return (
        <Snackbar
          style={{width: widthWith ? widthWith : '' }}
          anchorOrigin={ anchorOrigin }
          open={ !notificationsStore.hideLoginNotification }
          onClose={ this.handleClose }
        >
          { notificationsStore.notificationId === 'signup' && <LoginNotification onClose={this.handleClose}/> }
        </Snackbar>
    )
  }
}

Notifier.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Notifier)
