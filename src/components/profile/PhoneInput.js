import React, { Component } from 'react'
import MaskedInput from 'react-text-mask'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 5
  },
  formControl: {
    width: '100%'
  },
})

function TextMaskCustom(props) {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  )
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
}

class PhoneInput extends Component {
  state = {
    pristine: true,
    value: this.props.value ? this.props.value : " "
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
    this.props.onChange(event)
    this.setState({pristine: false})
  }

  isValidNumber = (number) => {
    if (!number) return false

    return number
      .replace("(","")
      .replace(")","")
      .replace("-","")
      .replace(" ","").trim().length === 10
  }

  render() {
    const { value } = this.state

    return (
      <TextField
        variant="outlined"
        id="user-phone"
        label="Phone"

        fullWidth
        margin="dense"
        error={!this.state.pristine && !this.isValidNumber(value)}
        InputProps={{
          inputComponent: TextMaskCustom,
          onChange: this.handleChange('value'),
          value: value,
        }}
      />
    )
  }
}

PhoneInput.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PhoneInput)
