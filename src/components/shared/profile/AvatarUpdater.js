import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Avatar from '@material-ui/core/Avatar'
import AvatarEditor from 'react-avatar-editor'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import IconButton from '@material-ui/core/IconButton'
import Slider from '@material-ui/lab/Slider'
import LinearProgress from '@material-ui/core/LinearProgress'
import FileUploader from 'react-firebase-file-uploader'
import firebase from 'firebase/app'
import 'firebase/storage'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

import { db } from 'components/commons/firebase/firebase'

@inject('usersStore')
@inject('appStore')
@inject('notificationsStore')
@observer
class AvatarUpdater extends Component {
  state = {
    open: false,
    scale: 40,
    loading: false
  }

  handleUploadError = () => {
    this.props.notificationsStore.showNotification("Something went wrong. Please try again")
  }

  handleChange = (event, scale) => this.setState({ scale })

  handleClickOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false })

  setEditorRef = editor => this.editor = editor

  handleUploadSuccess = filename => {
    this.setState({ filename })
    firebase
    .storage()
    .ref("imgs")
    .child(filename)
    .getDownloadURL()
    .then(url => {
      this.setState({ imageURL: url })
      this.setState({ loading: false })
    }).catch(error => {
      this.setState({ loading: false })
      console.log('PINGOTA XXX')
      console.error(error)
    })
  }

  // Holy shit!!!
  onSave = () => {
    this.props.appStore.loading = true

    if (this.editor) {
      const canvas = this.editor.getImage().toDataURL()
      fetch(canvas)
      .then(res => res.blob())
      .then(blob => {
        firebase
        .storage()
        .ref("imgs")
        .child('avatars/' + this.state.filename)
        .put(blob)
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
          .then(downloadURL => {
            const user = this.props.usersStore.currentUser
            user.picture = downloadURL
            const userRef = db.collection("users").doc(user.id)
            userRef.set({
              picture: downloadURL
            }, { merge: true }).then(() => {
              this.props.usersStore.fetchUserInfoFromDB(user)
              this.props.appStore.loading = false
            }).catch(error => {
              this.handleUploadError()
              console.error(error)
            })
          })
        }).catch(error => {
          this.handleUploadError()
          console.error(error)
        })
      }).catch(error => {
        this.handleUploadError()
        console.error(error)
      })
    }
    this.handleClose()
  }

  render() {
    const { classes, fullScreen, usersStore } = this.props
    const { scale } = this.state
    const user = usersStore.currentUser

    return (
      <div className={classes.row}>
        {
          user && <div>
          <IconButton onClick={this.handleClickOpen}
            className={classes.button} component="span">
            <PhotoCamera />
          </IconButton>
            { <Avatar
                src={user.picture}
                className={classes.avatar}
              />
            }
          </div>
        }
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <div>
              <AvatarEditor
                crossOrigin="anonymous"
                ref={this.setEditorRef}
                image={this.state.imageURL || user.picture}
                borderRadius={200}
                style={{height: fullScreen ? '100%': 350, width: fullScreen ? '100%': 350}}
                scale={1 + scale / 100}
              />
            </div>
            { this.state.loading && <LinearProgress className={classes.loader}/> }
            <div className={classes.uploaderContainer}>
              <FileUploader
                id="uploaderInput"
                accept="image/png,image/jpg,image/gif"
                storageRef={firebase.storage().ref('imgs')}
                onUploadStart={() => this.setState({loading: true})}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                randomizeFilename={true}
              />
            </div>
            <Slider className={classes.slider}
            min={1}
            value={scale} aria-labelledby="label"
            onChange={this.handleChange} />
          </DialogContent>
          <DialogActions>
            <Button className={classes.btn} onClick={this.handleClose}
              size="small"
              variant="text"
            >
              Cancel
            </Button>
            <Button className={classes.btn} onClick={this.onSave}
              size="small" variant="outlined" color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const styles = theme => ({
  btn: {
    textTransform: 'capitalize'
  },
  uploaderContainer: {
    marginTop: theme.spacing.unit,
    width: '100%',
  },
  slider: {
    width: '100%',
    marginLeft: '-8px'
  },
  button: {
    position: 'absolute',
    margin: '23px',
    zIndex: 10,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
    width: 70,
    height: 70,
  },
})

AvatarUpdater.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
}

export default withMobileDialog({breakpoint: 'xs'})(withStyles(styles)(AvatarUpdater))
