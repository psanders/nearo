import React, { Component } from 'react';
// FIXME: This is causing a warning in the console
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import AddPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

class UploaderButton extends Component {

  handleUploadError = error => {
    this.props.onError();
    console.error('Code 0002', error);
  };

  handleUploadSuccess = filename => {
    firebase
      .storage()
      .ref("imgs")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.props.onUploadSuccess(filename);
      }).catch(error => {
        console.error(error)
      })
  };

  triggerInputFile = () => {
    const fUploader= document.getElementById("uploaderInput");
    fUploader.click();
  }

  render() {

    return (
      <div>
        <form>
          <Tooltip title="Add Photo">
            <Button onClick={()=> this.triggerInputFile()} variant="outlined"
              style={{marginRight: 10}} color="secondary"
              aria-label="Photo Uploader Button"
            >
              <AddPhotoIcon />
            </Button>
          </Tooltip>
          <FileUploader
            id="uploaderInput"
            hidden
            accept="image/png,image/jpg,image/gif"
            storageRef={firebase.storage().ref('imgs')}
            onUploadStart={this.props.onUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            randomizeFilename={true}
          />
        </form>
      </div>
    );
  }
}

export default UploaderButton;
