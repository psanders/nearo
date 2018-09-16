import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography'
import LocationIcon from '@material-ui/icons/LocationOn'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import LinearProgress from '@material-ui/core/LinearProgress'
import Hidden from '@material-ui/core/Hidden'
import extract from 'find-hashtags'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { observer } from 'mobx-react'

import { getCategories } from '../commons/categories'
import Locator from '../locator/Locator'
import { db } from '../commons/firebase/firebase'
import UploaderButton from './UploaderButton'
import { styles } from './PostPanelStyles'

@observer
class PostPanel extends React.Component {
  state = {
    open: true,
    body: '',
    locInfo: {},
    loading: false,
    expanded: false,
    category: 'general',
    imageURL: ""
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  updateBody = e => this.setState({body: e.target.value})

  isSignedIn = () => this.props.user == null ? false : true

  getCategoryInText = text => {
    const tags = extract(text)
    const categories = getCategories()

    let results = []

    for (var i = 0; i < categories.length; i++) {
      if (tags.join().toLowerCase().includes(categories[i].ref)) {
          results.push(categories[i].ref)
      }
    }

    return results.length > 0 ? results[results.length - 1] : 'general'
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
    this.setState({imageURL: ""})
  }

  createPost = (self, body) => {
    self.setState({loading: true})

    const post = {
      category: this.getCategoryInText(this.state.body),
      author: this.props.usersStore.currentUser.username,
      body: body,
      likes: 0,
      locText: this.props.navStore.address,
      price: this.getPrice(this.state.body),
      timestamp: Date.now(),
      _geoloc: this.props.navStore.navInfo.latLng,
      deleted: false,
      image: this.state.imageURL
    }

    db.collection('posts')
    .add(post)
    .then(function(docRef) {
      post.id = docRef.id
    })
    .catch(function(error) {
      console.error("Error adding document: ", error)
    })
  }

  handleOnUploadStart = () => this.setState({loading: true})

  render() {
    const { classes, fullScreen } = this.props
    this.updateBody = this.updateBody.bind(this)

    return (
      <div>
        <Dialog
          fullScreen={ fullScreen }
          open={ this.state.open }
          onClose={ this.handleClose }
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"New Post"}</DialogTitle>
          <DialogContent className={classes.details}>
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
          </DialogContent>
          <Divider />

          { this.state.loading && <LinearProgress discolor="secondary" /> }
          { this.state.imageURL &&
            <div style={{padding: 10, paddingBottom: 0}}>
              <img alt="Post media" style={{width: 100}} src={this.state.imageURL}/>
              <div/>
              <Button onClick={() => this.setState({imageURL: ""})} style={{width: 100, borderRadius: 0}} className={classes.button} size="small">Remove</Button>
            </div>
          }

          <DialogActions style={{padding: 12, paddingRight: 20}}>
            <UploaderButton
              onUploadStart={this.handleOnUploadStart}
              onUploadSuccess={(url) => {
                this.setState({loading: false})
                this.setState({imageURL: url})
              }}
              onError={() => {
                  this.props.onNotification('Unable to upload image. Try again later')
                  this.setState({loading: false})
              }}
              />
            <Typography variant="caption" gutterBottom align="center">
               Near { this.props.navStore.address }
            </Typography>
            <span className={classes.flex}/>
            <Button onClick={ this.handleClose } className={ classes.button } size="small">Cancel</Button>
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

export default withMobileDialog()(withStyles(styles)(PostPanel))
