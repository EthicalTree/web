import './Banner.css'

import React from 'react'
import PropTypes from 'prop-types'

export const Banner = props => {
  const { children } = props

  return (
    <div className="banner text-center">
      {children}
    </div>
  )
}

Banner.propTypes = {
  children: PropTypes.node.isRequired
}

export default Banner
