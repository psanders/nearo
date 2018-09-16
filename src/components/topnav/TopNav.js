import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import PostIcon from '@material-ui/icons/LibraryAdd'
import AuthIcon from '@material-ui/icons/Fingerprint'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ProfileMenu from './ProfileMenu'
import Hidden from '@material-ui/core/Hidden'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import { doSignInWithGoogle } from '../commons/firebase/auth'
import { styles } from './TopnavStyles'
import Locator from '../locator/Locator'

@observer
class Topnav extends React.Component {
  state = {
    locInfo: null,
    searchTerm: ""
  }

  handleChange = name => event => {
    const searchTerm = event.target.value
    this.props.postsStore.updateBySearch({
      locInfo: this.state.locInfo,
      searchTerm: searchTerm
    })
    this.setState({searchTerm: searchTerm})
  }

  handleOnChangeLocation = locInfo => {
    this.props.postsStore.updateBySearch({
      locInfo: locInfo,
      searchTerm: this.state.searchTerm
    })
    this.setState({locInfo: locInfo})
  }

  render() {
    const { classes, usersStore } = this.props

    return (
      <div>
        <AppBar color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              <Link to="/" style={{color: '#fff', textDecoration: 'none'}}>Nearo</Link>
            </Typography>
            <span style={{marginLeft: '15px'}}/>
            <TextField
             style={{marginRight: 10}}
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
              <Locator name="topnav-locator" onChangeLocation={ this.handleOnChangeLocation } />
               <span className={ classes.flex } />
                {
                  !usersStore.isSignedIn() &&
                  <div>
                    <Button onClick={ doSignInWithGoogle } variant="outlined" className={classes.loginBtn}>
                      Login
                    </Button>
                    <Button onClick={ doSignInWithGoogle } variant="outlined" className={classes.signupBtn}>
                      Sign Up
                    </Button>
                  </div>
                }
            </Hidden>
            <Hidden smUp={true}>
               <span className={ classes.flex } />
                {
                  !usersStore.isSignedIn() &&
                  <Button onClick={ doSignInWithGoogle } >
                    <AuthIcon style={{ color: '#FFEA00'}} className={ classes.newPostIcon } />
                  </Button>
                }
            </Hidden>
            <Hidden smDown={true}>
              {
                usersStore.isSignedIn() &&
                <Button onClick={ this.props.postsStore.openPostDialog } >
                  <PostIcon style={{ color: '#FFEA00'}} className={ classes.newPostIcon } />
                </Button>
              }
            </Hidden>

            {
              usersStore.isSignedIn() && <ProfileMenu usersStore={ usersStore }/>
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
