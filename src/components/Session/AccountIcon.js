import React from 'react'
import PropTypes from 'prop-types'
import Gravatar from 'react-gravatar'

const AccountIcon = props => {
  const { email, name, size, showName } = props

  return (
    <span>
      <Gravatar size={size} email={email} default="mm" />
      {showName && (name || email)}
    </span>
  )
}

AccountIcon.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  showName: PropTypes.bool,
  size: PropTypes.number,
}

AccountIcon.defaultProps = {
  size: 42,
  showName: false,
  name: '',
}

export default AccountIcon
