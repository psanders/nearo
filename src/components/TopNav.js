import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MailIcon from '@material-ui/icons/Mail';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProfileMenu from './ProfileMenu';
import Hidden from '@material-ui/core/Hidden';
import { doSignInWithGoogle, doSignInWithFacebook } from '../firebase/auth';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Locator from './Locator';

const styles = theme => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: 5
  },
  rightIcon: {
    marginLeft: 100,
  },
  iconSmall: {
    fontSize: 25,
  },
  iconText: {
    textTransform: 'capitalize',
    color: 'black'
  },
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  bootstrapInput: {
    borderRadius: 4,
    color: '#5d5c5c',
    backgroundColor: '#f1f5ff',
    fontSize: 16,
    padding: '10px 12px',
    width: 300,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      color: 'black',
      borderColor: '#5d5c5c',
      boxShadow: '0 0 0 0.1rem #cdcdcd',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

class TopNav extends React.Component {

  constructor(props, context) {
      super(props, context);
      this.state = {
          open: false,
          locAddr: props.currentLocation,
          locLatLng: null
      };
  }

  componentDidMount() {
    //this.updateLocation(this.props.currentLocation);
  }

  updateLocation = (location) => {
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({locAddr: location});
        this.setState({locLatLng: latLng});
      })
      .catch(error => console.error('Error', error));
  }

  isSignedIn () {
      return this.props.user == null ? false : true
  }

  render() {
    const { classes, onOpenLogin } = this.props;

    return (
      <div>
      <AppBar elevation={0} color="primary">
        <Toolbar variant="dense">
          <Typography variant="title" color="inherit">
            Nearo
          </Typography>
          <span style={{marginLeft: '15px'}}/>
          <Hidden smDown={true}>
            <TextField
             style={{marginRight: 10}}
             placeholder="Search"
             id="bootstrap-input"
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
          <Locator initValue={this.state.locAddr} onSelect={(locAddr) => console.log('locAddr: ' + locAddr)} />
         </Hidden>
          <span className={classes.flex} style={{ borderRight: '0.05em solid #dcdcdc', padding: '1em' }}/>

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
            <div>
              <IconButton color="secondary" className={classes.button} aria-label="Post">
                <BookmarkBorder style={{height: 26, width: 26}} />
              </IconButton>
            </div>
          }

          { this.isSignedIn() && <ProfileMenu /> }
        </Toolbar>
      </AppBar>
      </div>
    );
  }
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopNav);
