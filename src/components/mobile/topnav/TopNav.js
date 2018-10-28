import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import { observer, inject } from 'mobx-react'

import Drawer from 'components/mobile/drawer/Drawer'
import PostPanel from 'components/shared/postpanel/PostPanel'
import SearchBar from 'components/mobile/searchbar/SearchBar'
import { commonStyles } from 'shared/styles/styles'

@inject('routing')
@inject('appStore')
@inject('postsStore')
@inject('usersStore')
@inject('notificationsStore')
@observer
class TopNav extends Component {
  state = {
    scrollPosition: 0
  }

  handleNav = () => {
    this.props.routing.push('/')
  }

  componentDidMount() {
    window.addEventListener("scroll", event => {
      this.setState({scrollPosition: window.pageYOffset || document.documentElement.scrollTop})
    }, false);
  }

  render() {
    const { appStore, usersStore } = this.props
    const { scrollPosition } = this.state
    const logo = {
      margins: {
        marginLeft: 20,
        marginRight: 20
      },
      color: {
        color: '#fff'
      }
    }

    return (
      <Fragment>
        <AppBar elevation={scrollPosition === 0 ? 0 : 1 }>
          <Toolbar disableGutters>
            {
              appStore.isReady() &&
              <Fragment>
                <Typography variant="h6" onClick={this.handleNav} style={logo.margins}>
                  <span style={logo.color}>N</span>
                </Typography>
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
