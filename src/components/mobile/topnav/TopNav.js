import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CameraIcon from '@material-ui/icons/CameraAlt'
import Avatar from '@material-ui/core/Avatar'
import { observer, inject } from 'mobx-react'

import Drawer from 'components/mobile/drawer/Drawer'
import SearchBar from 'components/mobile/searchbar/SearchBar'

@inject('postsStore')
@observer
class TopNav extends Component {
  openPostDialog = () => this.props.postsStore.openPostDialog()

  render() {
    const logo = {
      margins: {
        marginLeft: 20,
        marginRight: 20
      },
      color: {
        color: '#fff'
      },
      avatar: {
        width: 30,
        height: 30,
        marginLeft: 15,
        marginRight: 10,
        backgroundColor: 'transparent'
      }
    }

    return (
      <AppBar elevation={0}>
        <Toolbar disableGutters variant="dense">
          <Avatar alt="Nearo Logo" style={logo.avatar}
            onClick={ this.openPostDialog }
          >
            <CameraIcon />
          </Avatar>
          <SearchBar />
          <Drawer />
        </Toolbar>
      </AppBar>
    )
  }
}

export default TopNav
