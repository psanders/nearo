import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popper from '@material-ui/core/Popper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import LocationIcon from '@material-ui/icons/LocationOn'
import Paper from '@material-ui/core/Paper'
import toRenderProps from 'recompose/toRenderProps'
import withState from 'recompose/withState'
import { observer, inject } from 'mobx-react'

import SearchInput from './SearchInput'

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null))

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
    paddingBottom: 0
  },
  popper: {
    zIndex: 1,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.common.white} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.common.white} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.common.white} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.common.white}`,
      },
    },
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
})

@inject('navStore')
@observer
class LocatorMini extends Component {
  state = {
    arrowRef: null,
    open: false
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    })
  }

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };

  handleSelect = address => {
    if (!this.props.onLocationChange) {
      this.props.navStore.relocate(address)
    } else {
      this.props.onLocationChange(address)
    }
  }

  render() {
    const { classes } = this.props
    const label = this.props.label
      ? this.props.label
      : "Select a location close to your interest"

    return (
      <WithState>
        {({ anchorEl, updateAnchorEl }) => {
          const id = this.state.open ? 'render-props-popper' : null
          return (
            <React.Fragment>
              <IconButton
                aria-describedby={id}
                onClick={event => {
                  this.setState(state => ({
                     open: !state.open,
                  }));
                  updateAnchorEl(anchorEl? null: event.currentTarget)
                }}
                className={classes.locationIcon}
                >
                <LocationIcon />
              </IconButton>

              <Popper id={id} open={this.state.open} anchorEl={anchorEl}
                className={classes.popper}
                modifiers={{
                  arrow: {
                    enabled: true,
                    element: this.state.arrowRef,
                  },
                }}
                disablePortal>
                  <span className={classes.arrow} ref={this.handleArrowRef} />
                  <Paper>
                    <Typography variant="caption" className={classes.typography}>
                      {label}
                    </Typography>
                    <ClickAwayListener onClickAway={ event => {
                        // This is some crazy shit :(
                        if (!Boolean(anchorEl)) {
                          this.setState({open: false})
                          updateAnchorEl(null)
                        }
                    }}>
                      <SearchInput onSelect={address => {
                        this.handleSelect(address)
                        if (Boolean(anchorEl)) {
                          this.setState({open: false})
                          updateAnchorEl(null)
                        }
                      }} />
                    </ClickAwayListener>
                  </Paper>
              </Popper>
            </React.Fragment>
          )
        }}
      </WithState>
    )
  }
}

LocatorMini.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LocatorMini)
