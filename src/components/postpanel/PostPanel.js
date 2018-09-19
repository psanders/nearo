import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import LinearProgress from '@material-ui/core/LinearProgress'
import Hidden from '@material-ui/core/Hidden'
import extract from 'find-hashtags'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ellipsize from 'ellipsize'
import { observer } from 'mobx-react'

import { getCategories } from '../commons/categories'
import { db } from '../commons/firebase/firebase'
import UploaderButton from './UploaderButton'
import { styles } from './PostPanelStyles'

@observer
class PostPanel extends React.Component {
  state = {
    body: '',
    loading: false,
    expanded: false,
    category: 'news',
    media: [],
  }

  static defaultProps = {
    baseUrl: 'https://firebasestorage.googleapis.com/v0/b/locally-57510.appspot.com/o/images'
  }

  updateBody = e => this.setState({body: e.target.value})

  getCategoryInText = text => {
    const tags = extract(text)
    const categories = getCategories()

    let results = []

    for (var i = 0; i < categories.length; i++) {
      if (tags.join().toLowerCase().includes(categories[i].ref)) {
          results.push(categories[i].ref)
      }
    }

    return results.length > 0 ? results[results.length - 1] : 'news'
  }

  getPrice = (text) => {
    const prices = text.replace(',','').split(' ').filter(v => v.startsWith('$'))
    const cleanNumbers = prices.join(' ').replace(/\$/g, ' ').split(' ')
    const results = cleanNumbers.filter(price => !isNaN(price))
    return results.length > 0 ? Number(results[results.length - 1]) : 0
  }

  clearUI = () => {
    this.setState({body: ''})
    this.setState({loading: false})
    this.setState({expanded: false})
    this.setState({media: []})
  }

  createPost = (self, body) => {
    if (!this.props.usersStore.isSignedIn()) {
      this.props.notificationsStore
        .showMustLogin()
      return
    }
    self.setState({loading: true})

    const address = this.props.navStore.navInfo.locInfo.address
    const latLng = this.props.navStore.navInfo.locInfo.latLng

    const post = {
      category: this.getCategoryInText(this.state.body),
      author: this.props.usersStore.currentUser.username,
      userId: this.props.usersStore.currentUser.email,
      body: body,
      likes: 0,
      locText: address,
      price: this.getPrice(this.state.body),
      timestamp: Date.now(),
      _geoloc: latLng,
      deleted: false,
      media: this.state.media
    }

    db.collection('posts')
    .add(post)
    .then(docRef => {
      post.id = docRef.id
      this.props.postsStore.addNewPost(post)
      this.props.postsStore.hidePostDialog()
      this.clearUI()
    })
    .catch(function(error) {
      console.error("Error adding document: ", error)
      this.clearUI()
    })
  }

  handleOnUploadStart = () => this.setState({loading: true})

  getImage = () => this.props.baseUrl + '%2F' + this.state.media[0].filename + '?alt=media'

  render() {
    const { classes, fullScreen } = this.props
    this.updateBody = this.updateBody.bind(this)

    return (
      <div>
        <Dialog
          fullScreen={ fullScreen }
          open={ this.props.postsStore.isPostDialogOpen() }
          onClose={ this.props.postsStore.hidePostDialog }
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">New Post</DialogTitle>

          <Divider />

          <DialogContent className={ classes.details }>
            <TextField
              value={ this.state.body }
              onChange={ this.updateBody }
              multiline
              rows={4}
              fullWidth
              autoFocus
              InputProps={{
                inputProps: {
                  maxLength: 254,
                },
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
          </DialogContent>

          { this.state.media.length > 0 &&
            <div>
              <Hidden xsDown={true}>
                <div style={{ padding: 10, paddingBottom: 0 }}>
                  <img alt="Post media" style={{ width: 100 }} src={ this.getImage ()}/>
                  <div/>
                  <Button onClick={() => this.setState({image: ""})}
                    style={{width: 100, borderRadius: 0}}
                    className={classes.button} size="small">Remove</Button>
                </div>
              </Hidden>
              <Hidden smUp={true}>
                <div style={{ padding: 10 }}>
                  <Chip
                    avatar={<Avatar src={ this.getImage() } />}
                    label="Remove"
                    onDelete={ () => this.setState({media: []}) }
                    variant="outlined"
                  />
                </div>
              </Hidden>
            </div>
          }

          <Divider />

          { this.state.loading && <LinearProgress discolor="secondary" /> }

          <DialogActions style={{ padding: 12, paddingRight: 20 }}>
            <UploaderButton
              onUploadStart={this.handleOnUploadStart}
              onUploadSuccess={(filename) => {
                this.setState({loading: false})
                // This will later serve as a way to add multiple resources
                const media = [{
                  filename: filename
                }]
                this.setState({media: media})
              }}
              onError={() => {
                  this.props.notificationsStore.showNotification('Unable to upload image. Try again later')
                  this.setState({loading: false})
              }}
              />
            <Typography variant="caption" style={{textTransform: 'capitalize'}}>
               Nearby "{ ellipsize(this.props.navStore.navInfo.locInfo.address, 20, { truncate: false }) }"
            </Typography>
            <span className={ classes.flex }/>
            <Button onClick={ () => { this.clearUI(); this.props.postsStore.hidePostDialog() }}
              className={ classes.button } size="small">Cancel</Button>
            <Button className={ classes.button } disabled={!this.state.body || this.state.loading } onClick={ () =>  this.createPost(this, this.state.body) } variant="contained" size="small" color="secondary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

PostPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
}

export default withMobileDialog({breakpoint: 'xs'})(withStyles(styles)(PostPanel))
