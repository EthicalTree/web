import './PhoneNumber.css'
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'

import React from 'react'
import PhoneInput from 'react-phone-number-input'
import {isValidNumber} from 'libphonenumber-js'

export class PhoneNumber extends React.Component {

  handleChange = phone => {
    const { onChange, onValidation } = this.props
    const isValid = isValidNumber(phone || '')
    this.setState({ isValid })

    if (isValid) {
      onChange(phone)
    }


    if (onValidation) {
      onValidation(isValid)
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      isValid: true
    }
  }

  render() {
    const {
      country,
      error,
      id,
      name,
      placeholder,
      value
    } = this.props

    const { isValid } = this.state

    return (
      <PhoneInput
        placeholder={placeholder || 'Enter phone number'}
        country={country || 'CA'}
        value={value || ''}
        name={name || 'phoneNumber'}
        id={id || 'phoneNumber'}
        error={error || 'Phone Number is invalid'}
        indicateInvalid={!isValid}
        onChange={this.handleChange}
      />
    )
  }

}

export default PhoneNumber
