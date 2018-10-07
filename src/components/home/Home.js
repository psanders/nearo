import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'
import {computed} from 'mobx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'

import { styles } from './HomeStyles'
import ProfileMenu from '../topnav/ProfileMenu'
import Locator from '../locator/Locator'
import About from '../About'

@inject('appStore')
@inject('postsStore')
@inject('navStore')
@inject('usersStore')
@inject('bookmarksStore')
@inject('notificationsStore')
@withRouter
@observer
class Home extends Component {

  handleChange = name => event => {
    const navInfo = this.props.navStore.navInfo
    navInfo.searchTerm = event.target.value
    this.props.navStore.setNavInfo(navInfo)
  }

  handleOnChangeLocation = locInfo => {
    const navInfo = this.props.navStore.navInfo
    navInfo.locInfo = locInfo
    this.props.navStore.setNavInfo(navInfo)
  }

  goToLogin = () => {
    this.props.history.push('/login')
  }

  @computed get signed () {
    return this.props.usersStore.signedIn
  }

  render() {
    const { classes, usersStore } = this.props

    return <div>
      <AppBar elevation={0} style={{backgroundColor: '#fff'}}>
        <Toolbar >
          <About showAsLink={true} />
          <span className={ classes.flex } />
          {
            !usersStore.isSignedIn() &&
            <Button onClick={ this.goToLogin } variant="outlined" className={classes.loginBtn}
              aria-label="Sign In"
            >
              Sign In
            </Button>
          }
          {
            usersStore.isSignedIn() && <ProfileMenu/>
          }
        </Toolbar>
      </AppBar>
      <div className={ classes.toolbar }/>
      <div style={{display: 'flex', alignContent: 'center', alignItems:'center', height: 'calc(100vh - 55px)',  backgroundColor: '#fff'}}>
        <div style={{position: 'relative', top: '-55px',margin: '0 auto', maxWidth: 650}}>
          <Typography variant="display1" color="primary" >
            Nearo
          </Typography>
          <div style={{borderTopRightRadius: 10, borderBottomLeftRadius: 10, display: 'flex', padding: 10, backgroundColor: 'rgb(243, 243, 243)'}}>
            <TextField
             className={classnames(classes.right, classes.left)}
             placeholder="community, offers, services"
             id="searchInput"
             autoFocus={true}
             onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  // Do code here
                  ev.preventDefault()
                  this.props.history.push('/explore')
                }
              }}
             value={this.props.navStore.navInfo.searchTerm}
             onChange={this.handleChange('searchInput')}
             InputProps={{
               disableUnderline: true,
               classes: {
                 input: classes.bootstrapInput,
               }
             }}
             InputLabelProps={{
               shrink: true,
               className: classes.bootstrapFormLabel,
             }}
           />
            <Hidden xsDown={true}>
              <Locator name="locator" onChangeLocation={ this.handleOnChangeLocation } />
              <Button onClick={ () => this.props.history.push('/explore') } className={classes.searchBtn}
                variant="flat"
                aria-label="Sign Up"
              >
                Search
              </Button>
            </Hidden>
            <Hidden smUp={true}>
              <IconButton onClick={ () => this.props.history.push('/explore') }
                variant="flat"
                aria-label="Sign Up"
              >
                <SearchIcon />
              </IconButton>
            </Hidden>
          </div>
          <Typography variant="caption" style={{marginTop: 3}}>
            News and classified content relevant to you
          </Typography>
        </div>
      </div>
    </div>
  }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
