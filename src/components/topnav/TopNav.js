import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import BookmarkBorder from '@material-ui/icons/BookmarkBorder'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import ProfileMenu from './ProfileMenu'
import Hidden from '@material-ui/core/Hidden'

import { doSignInWithGoogle } from '../commons/firebase/auth'
import { styles } from './TopnavStyles'
import Locator from '../locator/Locator'

class Topnav extends React.Component {
  state = {
    locInfo: null,
    searchTerm: ""
  }

  isSignedIn  = () => this.props.user == null ? false : true

  handleChange = name => event => {
    console.log()
    const searchTerm = event.target.value
    this.props.onChange({
      locInfo: this.state.locInfo,
      searchTerm: searchTerm
    })
    this.setState({searchTerm: searchTerm})
  }

  handleOnChangeLocation = locInfo => {
    this.setState({locInfo: locInfo})
    this.props.onChange(this.state)
  }

  render() {
    const { classes, onOpenLogin } = this.props

    return (
      <div>
        <AppBar elevation={0} color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Nearo
            </Typography>
            <span style={{marginLeft: '15px'}}/>
            <Hidden smDown={true}>
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
           </Hidden>
           <Hidden smDown={true}>
            <Locator name="topnav-locator" onChangeLocation={ this.handleOnChangeLocation } />
           </Hidden>
            <span className={ classes.flex } style={{ borderRight: '0.05em solid #dcdcdc', padding: '1em' }}/>
            { !this.isSignedIn() &&
              <div>
                {false && <Button size="medium" onClick={onOpenLogin} color="secondary" variant="outlined" className={classes.button}>
                  Continue with Google
                </Button> }

               <Button  size="medium" onClick={() => doSignInWithGoogle()} color="secondary" variant="contained" className={classes.button}>
                  Continue with Google
                </Button>
              </div>
            }
            { this.isSignedIn() &&
              <Tooltip title="Saved Items">
                <IconButton color="secondary" className={classes.button} aria-label="Post">
                  <BookmarkBorder style={{height: 26, width: 26}} />
                </IconButton>
              </Tooltip>
            }
            { this.isSignedIn() && <ProfileMenu user={this.props.user}/> }
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
