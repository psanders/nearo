import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { observer, inject } from 'mobx-react'

@inject('accountStore')
@observer
export default class PasswordPrompt extends Component {
  state = {
    password: ''
  }

  linkAccounts = () => {
    console.log('Linking accounts')
    this.props.accountStore.linkAccounts(this.state.password)
  }

  handleClose = () => {
    this.props.accountStore.openDialog = false
  }

  handleContinue = () => {
    this.props.accountStore.linkAccounts(this.state.password)
  }

  handleChange = event => {
    if (event.target.id === "password") {
      this.setState({password: event.target.value})
    }
  }

  render() {
    const { accountStore } = this.props
    const { password } = this.state

    return (
      <div>
        {accountStore && <Dialog
          open={accountStore.openDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Link Accounts</DialogTitle>
          <DialogContent>
            <DialogContentText>
              An account with email <b>{accountStore.email}</b> already exist. To link the accounts please enter your
              password and click continue.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Account Password"
              type="password"
              value={password}
              onChange={this.handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleContinue} color="primary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>}
      </div>
    )
  }
}
