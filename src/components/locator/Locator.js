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
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { storeUserInfo } from '../commons/dbfunctions'
import { ellip } from '../commons/utils'
import { styles } from './LocatorStyles'
import SearchInput from './SearchInput'

class Locator extends Component {
  state = {
    expanded: false,
    address: this.props.address
  }

 componentWillReceiveProps(nextProps) {
   if(nextProps.address === this.state.address) return
   this.setState({address: nextProps.address})
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
    if (this.anchorEl.contains(e.target)) return
    this.setState({ expanded: false })
  }

  handleSelect = address => {
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
            id='location-button'
            ref={this.myButton}
            buttonRef={node => {
              this.anchorEl = node
            }}
            color="secondary"
            className={this.state.expanded? classes.locButtonOpen: classes.locButton}
            aria-owns={expanded ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            onMouseOut={this.handleClose}
            aria-label="Select Address Button"
           >
            <LocationIcon color="secondary" className={classes.leftIcon} />
            <span className={classes.iconText}>{ ellip( address, 22) }</span>
            <span className={classes.flex} />
            <ArrowDropDownIcon/>
          </Button>
          <Popper
            style={{zIndex: 2000}}
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
