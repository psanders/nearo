import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import AddPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

class UploaderButton extends Component {

  handleUploadError = error => {
    this.props.onError()
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.props.onProgress()
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.props.onUploadSuccess(url);
      });
  };

  triggerInputFile = () => {
    const fUploader= document.getElementById("uploaderInput");
    fUploader.click()
  }

  render() {

    return (
      <div>
        <form>
          <Tooltip title="Add Photo">
            <Button onClick={()=> this.triggerInputFile()} variant="outlined" style={{marginRight: 10}} color="secondary">
              <AddPhotoIcon />
            </Button>
          </Tooltip>
          <FileUploader
            id="uploaderInput"
            hidden
            accept="image/png,image/jpg,image/gif"
            storageRef={firebase.storage().ref('images')}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
          />
        </form>
      </div>
    );
  }
}

export default UploaderButton;
