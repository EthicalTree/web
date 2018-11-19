import './PhoneNumber.css'
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'

import React from 'react'
import PhoneInput from 'react-phone-number-input'
import { parsePhoneNumber } from 'libphonenumber-js'

export class PhoneNumber extends React.Component {
  handleChange = phone => {
    const { onChange, onValidation } = this.props

    let isValid
    try {
      isValid = phone ? parsePhoneNumber(phone).isPossible() : true
    } catch (e) {
      isValid = false
    }

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
      isValid: true,
    }
  }

  render() {
    const { country, error, id, name, placeholder, value } = this.props

    const { isValid } = this.state

    let formattedPhone
    try {
      formattedPhone = value
        ? parsePhoneNumber(value, 'CA').formatNational()
        : ''
    } catch (e) {
      formattedPhone = value
    }

    return (
      <PhoneInput
        placeholder={placeholder || 'Enter phone number'}
        country={country || 'CA'}
        value={formattedPhone || ''}
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
