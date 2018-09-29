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
      <div style={{height: 'calc(100vh - 65px)', width: '100vw', backgroundColor: '#fff'}}>
        <div style={{position:'relative', top: 'calc(50% - 100px)', margin: 'auto', maxWidth: 600,}}>
          <Typography variant="display1" color="primary" >
            Nearo
          </Typography>
          <div style={{display: 'flex', width: '100%', padding: 20, backgroundColor: 'rgb(243, 243, 243)'}}>
            <TextField
             className={classnames(classes.right, classes.left)}
             placeholder="Search Nearo"
             id="searchInput"
             onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  // Do code here
                  ev.preventDefault();
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
            </Hidden>
            <Button onClick={ () => this.props.history.push('/explore') } className={classes.searchBtn}
              variant="flat"
              aria-label="Sign Up"
            >
              Search
            </Button>
          </div>
          <Typography variant="caption" style={{marginTop: 3}}>
            News and classfied content relevant to you
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
