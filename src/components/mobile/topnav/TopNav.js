import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import { observer, inject } from 'mobx-react'

import PostPanel from 'components/postpanel/PostPanel'
import { commonStyles } from 'shared/styles/styles'

@inject('appStore')
@inject('postsStore')
@inject('usersStore')
@inject('notificationsStore')
@observer
class TopNav extends Component {

  handleClick = event => {
    if (!this.props.usersStore.isSignedIn()) {
      this.props.notificationsStore.showMustLogin()
      return
    }
    this.props.notificationsStore.showNotification("You don't have notifications")
  }

  render() {
    const { appStore, usersStore } = this.props

    return (
      <Fragment>
        <AppBar elevation={0}>
          <Toolbar > {
            appStore.isReady() &&
              <Fragment>
                <Typography variant="h6" >
                  <span style={commonStyles.logo}>Nearo</span>
                </Typography>
                {
                  usersStore.isSignedIn() &&
                  <Fragment>
                    <span style={ commonStyles.flex } />
                    <IconButton onClick={this.handleClick}>
                      <NotificationsIcon style={commonStyles.clrWhite} />
                    </IconButton>
                    <PostPanel />
                  </Fragment>
                }
              </Fragment>
            }
          </Toolbar>
        </AppBar>
      </Fragment>
    )
  }
}

export default TopNav
