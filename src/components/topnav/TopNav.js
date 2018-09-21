import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import AuthIcon from '@material-ui/icons/Fingerprint'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ProfileMenu from './ProfileMenu'
import Hidden from '@material-ui/core/Hidden'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'

import { doSignInWithGoogle } from '../commons/firebase/auth'
import { styles } from './TopnavStyles'
import Locator from '../locator/Locator'

@inject('postsStore')
@inject('navStore')
@inject('usersStore')
@withRouter
@observer
class Topnav extends React.Component {

  handleChange = name => event => {
    const navInfo = this.props.navStore.navInfo
    navInfo.searchTerm = event.target.value
    this.props.navStore.setNavInfo(navInfo)
    this.props.history.push('/')
  }

  handleOnChangeLocation = locInfo => {
    const navInfo = this.props.navStore.navInfo
    navInfo.locInfo = locInfo
    this.props.navStore.setNavInfo(navInfo)
    this.props.history.push('/')
  }

  render() {
    const { classes, usersStore } = this.props

    return (
      <div>
        <AppBar color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              <Link to="/" className={classes.logo}>Nearo</Link>
            </Typography>
            <TextField
             className={classnames(classes.right, classes.left)}
             placeholder="Search"
             id="searchInput"
             onChange={this.handleChange('searchInput')}
             InputProps={{
               disableUnderline: true,
               classes: {
                 root: classes.bootstrapRoot,
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

            <Hidden smDown={true}>
             <span className={ classes.flex } />
              {
                !usersStore.isSignedIn() &&
                <div>
                  <Button onClick={ doSignInWithGoogle } variant="outlined" className={classes.loginBtn}
                    aria-label="Authenticate with Google"
                  >
                    Login
                  </Button>
                  <Button onClick={ doSignInWithGoogle } variant="outlined" className={classes.signupBtn}
                    aria-label="Sign Up with Google"
                  >
                    Sign Up
                  </Button>
                </div>
              }
            </Hidden>
            <Hidden mdUp={true}>
            <span className={ classes.flex } />
              {
                !usersStore.isSignedIn() &&
                <Button onClick={ doSignInWithGoogle }
                  aria-label="Open Authentication Window"
                >
                  <AuthIcon className={ classes.authIcon } />
                </Button>
              }
            </Hidden>
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
