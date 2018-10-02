import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ProfileMenu from './ProfileMenu'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import LoginIcon from '@material-ui/icons/Fingerprint'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'

import { currentPath } from '../commons/utils'
import { styles } from './TopnavStyles'
import Locator from '../locator/Locator'

@inject('navStore')
@inject('usersStore')
@withRouter
@observer
class Topnav extends React.Component {

  handleChange = name => event => {
    const navInfo = this.props.navStore.navInfo
    navInfo.searchTerm = event.target.value
    this.props.navStore.setNavInfo(navInfo)
    this.props.history.push('/explore')
  }

  handleOnChangeLocation = locInfo => {
    const navInfo = this.props.navStore.navInfo
    navInfo.locInfo = locInfo
    this.props.navStore.setNavInfo(navInfo)
    this.props.history.push('/explore')
  }

  goToLogin = () => this.props.history.push('/login')

  handleNav = () => this.props.history.push(currentPath(1) === 'explore'? '/' : '/explore')

  render() {
    const { classes, usersStore } = this.props

    return (
      <div>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit" onClick={this.handleNav}>
              <span className={classes.logo}>Nearo</span>
            </Typography>
            <TextField
             className={classnames(classes.right, classes.left)}
             placeholder="Search"
             id="searchInput"
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
            </Hidden>
            <span className={ classes.flex } />
            {
              !usersStore.isSignedIn() &&
              <div>
                <Hidden smDown={true}>
                  <Button onClick={ this.goToLogin } variant="outlined" className={classes.loginBtn}
                    aria-label="Sign Up"
                  >
                    Login
                  </Button>
                  <Button onClick={ this.goToLogin } variant="outlined" className={classes.signupBtn}
                    aria-label="Sign Up"
                  >
                    Sign Up
                  </Button>
                </Hidden>
                <Hidden mdUp={true}>
                  <IconButton onClick={ this.goToLogin } variant="outlined" className={classes.fingerPrint} aria-label="Login">
                    <LoginIcon />
                  </IconButton>
                </Hidden>
              </div>
            }
            {
              usersStore.isSignedIn() && <ProfileMenu/>
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Topnav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Topnav)
