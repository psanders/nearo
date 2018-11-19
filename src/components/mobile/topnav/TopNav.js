import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CameraIcon from '@material-ui/icons/CameraAlt'
import Avatar from '@material-ui/core/Avatar'
import { observer, inject } from 'mobx-react'

import Drawer from 'components/mobile/drawer/Drawer'
import SearchBar from 'components/mobile/searchbar/SearchBar'

@inject('routing')
@inject('appStore')
@inject('postsStore')
@observer
class TopNav extends Component {
  state = {
    scrollPosition: 0
  }

  openPostDialog = () => {
    this.props.postsStore.openPostDialog()
  }

  componentDidMount() {
    window.addEventListener("scroll", event => {
      this.setState({scrollPosition: window.pageYOffset || document.documentElement.scrollTop})
    }, false);
  }

  render() {
    const { appStore } = this.props
    const { scrollPosition } = this.state
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
      <Fragment>
        <AppBar elevation={scrollPosition === 0 ? 0 : 1 }>
          <Toolbar disableGutters>
            {
              appStore.isReady() &&
              <Fragment>
                <Avatar alt="Nearo Logo" style={logo.avatar}
                  onClick={ this.openPostDialog }
                >
                  <CameraIcon />
                </Avatar>
                <SearchBar />
                <Drawer />
              </Fragment>
            }
          </Toolbar>
        </AppBar>
      </Fragment>
    )
  }
}

export default TopNav
