import React from 'react'
import MaskedInput from 'react-text-mask'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

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

class PhoneInput extends React.Component {
  state = { value: this.props.value }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
    this.props.onChange(event)
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
    const { classes, id } = this.props

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor={id}>Phone</InputLabel>
          <Input
            error={!this.isValidNumber(this.state.value)}
            value={this.state.value}
            onChange={this.handleChange('value')}
            id={id}
            inputComponent={TextMaskCustom}
          />
        </FormControl>
      </div>
    )
  }
}

PhoneInput.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PhoneInput)
