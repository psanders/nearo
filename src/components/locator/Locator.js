import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import LocationIcon from '@material-ui/icons/LocationOn'
import EllipsisText  from 'react-ellipsis-text'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { storeUserInfo, fetchUserInfo } from '../commons/dbfunctions';

import { styles } from './LocatorStyles'
import SearchInput from './SearchInput'

class Locator extends Component {
  state = {
    expanded: false,
    address: 'Anywhere'
  }

  componentDidMount = () => {
    fetchUserInfo(this.props.name)
    .then(locInfo => {
      if (locInfo) {
        this.props.onChangeLocation(locInfo)
        this.setState({address: locInfo.address});
      }
    })
  }

  handleToggle = e => {
    this.setState(state => ({ expanded: !state.expanded }))
    if (e.currentTarget.id === 'location-button') {
      if(this.state.expanded) {
        e.currentTarget.blur()
      } else {
        e.currentTarget.focus()
      }
    }
  }

  handleClose = e => {
    if (this.anchorEl.contains(e.target)) {
      return
    }
    this.setState({ expanded: false })
  }

  handleSelect = address => {
    if (address === 'Anywhere') {
      const locInfo = {
        address: 'Anywhere',
        latLng: null
      }
      this.props.onChangeLocation(locInfo)
      storeUserInfo(this.props.name, locInfo)
    } else {
      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const locInfo = {
          address: address,
          latLng: latLng
        }
        this.props.onChangeLocation(locInfo)
        storeUserInfo(this.props.name, locInfo)
      })
      .catch(error => console.error('Error', error))
    }

    this.setState({ address: address })
    this.setState({ expanded: false })
  }

  render() {
    const { classes } = this.props
    const { expanded, address } = this.state
    this.myButton = React.createRef()

    return (
      <div className={classes.root}>
        <div>
          <Button
              color="secondary"
              className={this.state.expanded? classes.locButtonOpen: classes.locButton}
              id='location-button'
              ref={this.myButton}
              buttonRef={node => {
                this.anchorEl = node
              }}
              aria-owns={expanded ? 'menu-list-grow' : null}
              aria-haspopup="true"
              onClick={this.handleToggle}
              onMouseOut={this.handleClose}
               >
              <LocationIcon color="secondary" className={classes.leftIcon} />
              <EllipsisText className={classes.iconText} text={'' + address} length={22} />
              <span className={classes.flex} />
              <ArrowDropDownIcon style={{color: 'black'}}/>
          </Button>
          <Popper
            style={{zIndex: 1000}}
            placement="bottom"
            disablePortal={false}
            open={expanded}
            anchorEl={this.anchorEl}
            transition
            >
            {({ TransitionProps, placement }) => (
              <Grow
                elevation={0}
                className={classes.menuGrow}
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper style={{width: 250}}>
                  <ClickAwayListener onClickAway={this.handleClose} >
                    <SearchInput
                      showDefaultItem={address !== "Anywhere"}
                      onSelect={this.handleSelect}/>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    )
  }
}

Locator.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Locator)
