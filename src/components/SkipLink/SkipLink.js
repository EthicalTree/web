import './SkipLink.css'

import React from 'react'
import PropTypes from 'prop-types'

export class SkipLink extends React.PureComponent {
  render() {
    const { handleSkip } = this.props

    return (
      <a
        href=""
        className="skip-link"
        onClick={e => {
          e.preventDefault()
          handleSkip()
        }}>
        Skip to main
      </a>
    )
  }
}

SkipLink.propTypes = {
  handleSkip: PropTypes.func.isRequired,
}

export default SkipLink
