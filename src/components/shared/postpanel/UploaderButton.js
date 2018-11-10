import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'
import FileUploader from 'react-firebase-file-uploader'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import IconButton from '@material-ui/core/IconButton'

class UploaderButton extends Component {

  handleUploadError = error => {
    this.props.onError()
    console.error('Code 0002', error)
  }

  handleUploadSuccess = filename => {
    firebase
      .storage()
      .ref("imgs")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.props.onUploadSuccess(filename)
      }).catch(error => {
        console.error(error)
      })
  }

  triggerInputFile = () => {
    const fUploader= document.getElementById("uploaderInput")
    fUploader.click()
  }

  render() {

    return (
      <div>
        <form>
          <IconButton onClick={()=> this.triggerInputFile()}
            aria-label="Photo Uploader Button"
          >
            <CameraIcon />
          </IconButton>
          <FileUploader
            id="uploaderInput"
            hidden
            multiple
            accept="image/png,image/jpg,image/gif"
            storageRef={firebase.storage().ref('imgs')}
            onUploadStart={this.props.onUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            randomizeFilename={true}
          />
        </form>
      </div>
    )
  }
}

export default UploaderButton
