import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import AddPhotoIcon from '@material-ui/icons/AddAPhoto';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Locator from './Locator';
import LinearProgress from '@material-ui/core/LinearProgress';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css';
import './filepicker-custom.css';
import 'dropzone/dist/dropzone.css';
import ReactDOMServer from 'react-dom/server';
import { db } from '../firebase/firebase';

const styles = {
  button: {
    textTransform: 'capitalize',
    fontSize: 12,
    color: 'gray',
    marginRight: 4
  },
  flex: {
    flex: 1,
  },
  hidden: {
    display: 'none'
  }
};

class DontDeleteYet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: false,
      fileAttached: false,
      category: 'news'
    }
    this.updateState = this.updateState.bind(this);
  }

  updateState = (e) => {
    this.setState({data: e.target.value});
  }

  handleClose = () => {
    this.props.onClose();
    this.setState({data: ""});
    this.setState({loading: false});
    this.setState({fileAttached: false});
  }

  createPost = (self, desc) => {
    self.setState({loading: true})
    db.collection("posts").add({
      category: self.state.category,
      author: 'sanderspedro@gmail.com',
      description: desc,
      likes: 0,
      //timestamp: new Date.now()
    })
    .then(function(docRef) {
      self.props.onClose();
      self.setState({data: ""});
      self.setState({loading: false});
      self.setState({fileAttached: false});
    })
    .catch(function(error) {
      self.props.onClose();
      self.setState({loading: true});
      self.setState({data: ""});
      console.error("Error adding document: ", error);
    });
  }

  fileUploaded(self) {
    self.setState({fileAttached: true});
  }

  handleChange = name => event => {
    this.setState({ category: event.target.value });
    console.log('name: ' + this.state.category);
  };

  render() {
    const { classes, onClose, endpoint, handleOnSuccess, handleClose, ...other } = this.props;
    const eventHandlers = {
      success: handleOnSuccess,
      maxfilesreached: () => this.fileUploaded(this)
    }
    const djsConfig = {
      addRemoveLinks: true,
      clickable: '#add-photo',
      maxFiles: 1,
      previewTemplate: ReactDOMServer.renderToStaticMarkup(
        <div className="dz-preview dz-file-preview">
          <div className="dz-details">
            <div className="dz-filename"><span data-dz-name="true"></span></div>
            <img alt="Thumbnail" data-dz-thumbnail="true" />
          </div>
          <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
          <div className="dz-success-mark"><span>✔</span></div>
          <div className="dz-error-mark"><span>✘</span></div>
          <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
        </div>
      )
    };

    const componentConfig = {
        iconFiletypes: ['.png', '.jpg', '.jpef', '.gif'],
        postUrl: "http://localhost:3000"
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
          {this.state.loading && <LinearProgress color="secondary" /> }
          <DialogTitle id="simple-dialog-title">New Post</DialogTitle>
          <DialogContent style={{width: 500, height: 500}}>
            <TextField
              id="multiline-static"
              label="Post Description"
              multiline
              rows="4"
              rowsMax="4"
              InputProps={{ inputProps: { maxLength: 256 } }}
              helperText="Cameron, NC"
              className={classes.textField}
              fullWidth
              value={this.state.data}
              onChange={this.updateState}
              style={{marginBottom: 10}}
            />
            <DropzoneComponent /*className={this.state.fileAttached == false ? classes.hidden : ''}*/ eventHandlers={eventHandlers} djsConfig={djsConfig} config={componentConfig} />
          </DialogContent>
          <DialogActions style={{padding: 5, marginBottom: 0, marginLeft: 15, marginRight: 15}}>
            <Button variant="outlined" id="add-photo" size="medium" className={classes.button}>
              <AddPhotoIcon className={classes.icon}/>
            </Button>
            <Locator/>
            {false && <FormControl required className={classes.formControl}>
              <Select
                native
                value={this.state.category}
                name="category"
                onChange={this.handleChange('category')}
                inputProps={{
                  id: 'age-native-required',
                }}
              >
                <option value="news">News</option>
                <option value="cars">Cars</option>
                <option value="investment">Investment</option>
              </Select>
            </FormControl>}
          </DialogActions>
          <DialogActions style={{padding: 5, marginBottom: 0, marginLeft: 15, marginRight: 15}}>
            <span className={classes.flex}/>
            <Button onClick={() => this.handleClose()} variant="outlined" size="medium" color="secondary">
              Cancel
            </Button>
            <Button disabled={!this.state.data} onClick={() => this.createPost(this, this.state.data)} variant="contained" size="medium" color="secondary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }
}

DontDeleteYet.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default withStyles(styles)(DontDeleteYet);
