import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import  ReactMarkdown from 'react-markdown'

import { privacyContent } from 'privacy_policy'
import { terms } from 'terms_and_conditions'

class About extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
  }

  handleClickOpen = scroll => () => this.setState({ open: true, scroll })

  handleClose = () => this.setState({ open: false })

  render() {
    const { fullScreen, showAsLink, gutterBottom } = this.props

    return (
      <div>
        {!showAsLink
          && <Card onClick={this.handleClickOpen('paper')} elevation={0}
          style={{minWidth: 300, borderRadius: 0, marginBottom: gutterBottom ? gutterBottom : 10}}>
          <CardActionArea style={{width: '100%'}}>
            <CardContent>
                <Typography variant="subheading" >
                  About
                </Typography>
                <Typography variant="caption" gutterBottom align="center">
                Terms and Conditions | Privacy Policy User Agreement © 2020 Nearo, Inc. All rights reserved
                </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        }

        { showAsLink
          && <div onClick={this.handleClickOpen('paper')} style={{cursor: 'pointer'}}>
            <Typography style={{color: '#fff'}}  align="center">
              About
            </Typography>
          </div>
        }

        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">About</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <ReactMarkdown source={terms} />
              <ReactMarkdown source={privacyContent} />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="secondary"
              aria-label="Close About Window"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

About.propTypes = {
  fullScreen: PropTypes.bool.isRequired
}

export default withMobileDialog()(About)
