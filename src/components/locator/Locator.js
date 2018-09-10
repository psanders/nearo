import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LocationIcon from '@material-ui/icons/LocationOn';
import EllipsisText  from 'react-ellipsis-text';
import LocationSearchInput from './LocationSearchInput';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  flex: {
    flex: 1,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  locButton: {
    backgroundColor: '#fff',
    width: 252,
    border: '1px solid #fff',
    '&:hover': {
      backgroundColor: '#fff',
      border: '1px solid ' + theme.palette.secondary.main
    },
    '&:focus': {
      backgroundColor: '#fff',
      border: '1px solid ' + theme.palette.secondary.main,
      borderBottom: '1px solid #fff',
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  locButtonOpen: {
    //marginLeft: theme.spacing.unit,
    backgroundColor: '#fff',
    width: 252,
    border: '1px solid ' + theme.palette.secondary.main,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    '&:hover': {
      backgroundColor: '#fff',
      border: '1px solid ' + theme.palette.secondary.main
    }
  },
  menuGrow: {
    marginTop: -2,
    marginLeft: 1,
    border: '1px solid ' + theme.palette.secondary.main,
    borderTop: '0.01em solid #fff',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  },
  leftIcon: {
    marginLeft: 0,
    marginRight: 10
  },
  iconSmall: {
    fontSize: 25,
  },
  iconText: {
    textTransform: 'capitalize',
    color: 'black'
  },
});

class Locator extends React.Component {

  constructor(props){
    super(props)
    this.myButton = React.createRef()
    this.state = {
      open: false,
      locLatLng: null
    };
  }

  componentDidMount = () => {
  }

  handleToggle = event => {
    this.setState(state => ({ open: !state.open }));
    if (event.currentTarget.id === 'location-button') {
      if(this.state.open) {
        event.currentTarget.blur()
      } else {
        event.currentTarget.focus()
      }
    }
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  handleSelect = locAddr => {
    this.props.onSelect(locAddr);
    this.setState({locAddr: locAddr});
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <Button
              color="secondary"
              className={this.state.open? classes.locButtonOpen: classes.locButton}
              id='location-button'
              ref={this.myButton}
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={open ? 'menu-list-grow' : null}
              aria-haspopup="true"
              onClick={this.handleToggle}
              onMouseOut={this.handleClose}
               >
              <LocationIcon color="secondary" className={classes.leftIcon} />
              <EllipsisText className={classes.iconText} text={'' + this.state.locAddr} length={22} />
              <span className={classes.flex} />
              <ArrowDropDownIcon style={{color: 'black'}}/>
          </Button>
          <Popper
            style={{zIndex: 1000}}
            placement="bottom"
            disablePortal={false}
            open={open}
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
                    <LocationSearchInput
                      showDefaultItem={this.state.locAddr !== "Everywhere"}
                      onSelect={ locAddr => {this.handleSelect(locAddr)}}/>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

Locator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locator);
