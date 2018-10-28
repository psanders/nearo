import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { observer, inject } from 'mobx-react'

import Drawer from 'components/mobile/drawer/Drawer'
import SearchBar from 'components/mobile/searchbar/SearchBar'


@inject('routing')
@inject('appStore')
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
        width: 33,
        height: 33,
        backgroundColor: 'rgb(108, 113, 206)',
        marginLeft: 15,
        marginRight: 15
      }
    }

    return (
      <Fragment>
        <AppBar elevation={scrollPosition === 0 ? 0 : 1 }>
          <Toolbar disableGutters>
            {
              appStore.isReady() &&
              <Fragment>
                <Avatar style={logo.avatar}>
                  <Typography variant="h5" onClick={this.handleNav} >
                    <span style={logo.color}>N</span>
                  </Typography>
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
