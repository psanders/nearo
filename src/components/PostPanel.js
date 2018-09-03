import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/Edit';
import AddPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import extract from 'mention-hashtag';
import { getCategories } from './categories';
import Locator from './Locator';
import { db, auth } from '../firebase/firebase';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  root: {
    width: '100%',
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
      category: 'news',
      user: null
    }
    this.updateBody = this.updateBody.bind(this);
  }

  updateBody = (e) => {
    this.setState({body: e.target.value});
  }

  componentDidMount() {
    this.updateLocation(this.props.currentLocation);
    auth.onAuthStateChanged(user => {
        this.setState({user: user});
        console.log(user);
    });
  }

  updateLocation = (location) => {
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({locAddr: location});
        this.setState({locLatLng: latLng});
        console.log('Success', latLng)
      })
      .catch(error => console.error('Error', error));
  }

  getCategoryInText = (text) => {
    const tags = extract(text, { symbol: false, type: '#' });
    const categories = getCategories();

    let results = [];

    for (var i = 0; i < categories.length; i++) {
      if (tags.join().toLowerCase().includes(categories[i].ref)) {
          results.push(categories[i].ref);
      }
    }

    return results.length > 0 ? results[results.length - 1] : 'news';
  }

  getPrice = (text) => {
    const prices = text.split(' ').filter(v => v.startsWith('$'));
    const cleanNumbers = prices.join(' ').replace(/\$/g, ' ').split(' ');
    const results = cleanNumbers.filter(price => !isNaN(price));
    return results.length > 0 ? results[results.length - 1] : 0;
  }

  createPost = (self, body) => {
    self.setState({loading: true})
    db.collection('posts').add({
      category: this.getCategoryInText(this.state.body),
      author: this.state.user.email,
      body: body,
      likes: 0,
      locText: this.state.locAddr,
      locLatLng: this.state.locLatLng,
      price: this.getPrice(this.state.body),
      timestamp: Date.now()
    })
    .then(function(docRef) {
      self.setState({body: ''});
      self.setState({loading: false})
      self.setState({expanded: false})
      self.props.onNewPost();
    })
    .catch(function(error) {
      self.setState({body: ''});
      self.setState({loading: false})
      self.setState({expanded: false})
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
          {this.state.loading && <LinearProgress discolor="secondary" /> }
          <ExpansionPanelActions style={{padding: 12, paddingRight: 20}}>
            <Button variant="outlined" style={{marginRight: 10}} color="secondary">
              <AddPhotoIcon />
            </Button>
            <Locator initValue={this.state.locAddr} onSelect={(locAddr) => this.updateLocation(locAddr)}/>
            <span className={classes.flex}/>
            <Button size="small">Cancel</Button>
            <Button disabled={!this.state.body || this.state.loading} onClick={() =>  this.createPost(this, this.state.body)} variant="contained" size="small" color="secondary">
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
