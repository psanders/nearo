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

export const isValidNumber = (number) => {
  if (!number) return true
  const digits = number
    .replace("(","")
    .replace(")","")
    .replace("-","")
    .replace(" ","").trim().length
  return digits === 0 || digits === 10 ? true : false
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
}

class PhoneInput extends Component {
  state = {
    pristine: true,
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
    this.props.onChange(event)
    this.setState({pristine: false})
  }

  render() {
    const { value } = this.props

    return (
      <TextField
        variant="outlined"
        id="user-phone"
        label="Phone"
        fullWidth
        margin="dense"
        error={!this.state.pristine && !isValidNumber(value)}
        InputProps={{
          inputComponent: TextMaskCustom,
          onChange: this.handleChange('value'),
          value: value? value : " ",
        }}
      />
    )
  }
}

PhoneInput.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PhoneInput)
