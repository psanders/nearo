import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import LocationIcon from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Hidden from '@material-ui/core/Hidden';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import extract from 'find-hashtags';
import { getCategories } from '../commons/categories';
import Locator from '../locator/Locator';
import { db } from '../commons/firebase/firebase';
import UploaderButton from './UploaderButton';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  root: {
    width: '100%',
    border: '1px solid #cdcdcd',
    /*'&:hover': {
        border: '1px solid #444',
        cursor: 'pointer'
    }*/
  },
  cover: {
    minHeight: 300,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
    padding: 0
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  customTFRoot: {
    backgroundColor: '#fff',
    width: 'calc(100% - 20px)',
    padding: 10,
  },
  customTFInput: {
    color: 'black',
    fontSize: 14
  },
  customTFLabel: {
  },
  button: {
    textTransform: 'Capitalize',
  },
});

class PostPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: '',
      locAddr: props.currentLocation,
      locLatLng: null,
      loading: false,
      expanded: false,
      category: 'general',
      imageURL: ""
    }
    this.updateBody = this.updateBody.bind(this);
  }

  updateBody = (e) => {
    this.setState({body: e.target.value});
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

  getCategoryInText = (text) => {
    const tags = extract(text);
    const categories = getCategories();

    let results = [];

    for (var i = 0; i < categories.length; i++) {
      if (tags.join().toLowerCase().includes(categories[i].ref)) {
          results.push(categories[i].ref);
      }
    }

    return results.length > 0 ? results[results.length - 1] : 'general';
  }

  getPrice = (text) => {
    const prices = text.split(' ').filter(v => v.startsWith('$'));
    const cleanNumbers = prices.join(' ').replace(/\$/g, ' ').split(' ');
    const results = cleanNumbers.filter(price => !isNaN(price));
    return results.length > 0 ? Number(results[results.length - 1]) : 0;
  }

  clearUI = () => {
    this.setState({body: ''});
    this.setState({loading: false});
    this.setState({expanded: false});
    this.setState({imageURL: ""});
  }

  createPost = (self, body) => {
    if (!this.isSignedIn()) {
      this.props.onNotification('You must login to create a new post');
      return
    }
    self.setState({loading: true})

    const post = {
      category: this.getCategoryInText(this.state.body),
      author: this.props.user.email,
      body: body,
      likes: 0,
      locText: this.state.locAddr,
      price: this.getPrice(this.state.body),
      timestamp: Date.now(),
      _geoloc: this.state.locLatLng,
      deleted: false,
      image: this.state.imageURL
    }

    db.collection('posts')
    .add(post)
    .then(function(docRef) {
      self.clearUI();
      self.props.onNotification('Post submited');
      self.props.onNewPost(post);
    })
    .catch(function(error) {
      self.clearUI();
      self.props.onNotification('Unable to submit post. Try again later');
      console.error("Error adding document: ", error);
    });
  }

  changeExpanded = () => {
    this.setState({expanded: !this.state.expanded})
    if (!this.state.expanded) {
      this.textField.focus();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={this.state.expanded} elevation={0} >
          <ExpansionPanelSummary
            onClick={() => this.changeExpanded()}
            expandIcon={<ExpandMoreIcon />}>
            <div>
              <Typography className={classes.heading}>New Post</Typography>
            </div>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails className={classes.details}>
            <TextField
              inputRef={tf => this.textField = tf}
              value={this.state.body}
              onChange={this.updateBody}
              multiline
              rows="4"
              fullWidth
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.customTFRoot,
                  input: classes.customTFInput,
                },
              }}
              InputLabelProps={{
                shrink: false,
                className: classes.customTFLabel,
              }}
            />
          </ExpansionPanelDetails>
          <Divider />
          {this.state.imageURL &&
            <div style={{padding: 10, paddingBottom: 0}}>
              <img alt="Post media" style={{width: 100}} src={this.state.imageURL}/>
              <div/>
              <Button onClick={() => this.setState({imageURL: ""})} style={{width: 100, borderRadius: 0}} className={classes.button} size="small">Remove</Button>
            </div>
          }
          {this.state.loading && <LinearProgress discolor="secondary" /> }
          <ExpansionPanelActions style={{padding: 12, paddingRight: 20}}>
            <UploaderButton
              onProgress={() => this.setState({loading: true})}
              onUploadSuccess={(url) => {
                this.setState({loading: false});
                this.setState({imageURL: url})
              }}
              onError={() => {
                  this.props.onNotification('Unable to upload image. Try again later');
                  this.setState({loading: false});
              }}
              />
            <Hidden smUp={true}>
              <Button variant="outlined" style={{marginRight: 10}} color="secondary">
                <LocationIcon />
              </Button>
            </Hidden>
            <Hidden smDown={true}>
              <Locator initValue={this.state.locAddr} onSelect={locAddr => this.updateLocation(locAddr)}/>
            </Hidden>
            <span className={classes.flex}/>
            <Hidden xsDown={true}>
              <Button onClick={() => this.clearUI()} className={classes.button} size="small">Cancel</Button>
            </Hidden>
            <Button className={classes.button} disabled={!this.state.body || this.state.loading} onClick={() =>  this.createPost(this, this.state.body)} variant="contained" size="small" color="secondary">
              Post
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

PostPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostPanel);
