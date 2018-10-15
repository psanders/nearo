import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import { observer, inject } from 'mobx-react'

import PostPanel from '../postpanel/PostPanel'
import { commonSyles } from '../../shared/styles/styles'

@inject('appStore')
@inject('postsStore')
@inject('usersStore')
@inject('notificationsStore')
@observer
class TopNav extends Component {

  handleClick = event => {
    if (!this.props.usersStore.isSignedIn()) {
      this.props.notificationsStore.showMustLogin(() => {
        this.props.appStore.currentView('/profile')
      })
      return
    }
    this.props.notificationsStore.showNotification("You don't have notifications")
  }

  render() {
    const { appStore } = this.props

    return (
      <Fragment>
        <AppBar elevation={0}>
          <Toolbar> {
            appStore.isReady() &&
              <Fragment>
                <Typography variant="title" >
                  <span style={commonSyles.logo}>Nearo</span>
                </Typography>

                <span style={ commonSyles.flex } />

                <IconButton onClick={this.handleClick}>
                  <NotificationsIcon style={commonSyles.clrWhite} />
                </IconButton>

                <PostPanel />
              </Fragment>
            }
          </Toolbar>
          {
            (this.props.appStore.loading || this.props.postsStore.loading) &&
            this.props.appStore.isReady() &&
            navigator.onLine === true &&
            <LinearProgress />
          }
        </AppBar>
      </Fragment>
    )
  }
}

export default TopNav
