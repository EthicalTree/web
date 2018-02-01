import './Footer.css'

import React from 'react'
import { connect } from 'react-redux'

import { hasFixedHeader } from './Header'

const Footer = (props) => {
  if (hasFixedHeader) {
    return null
  }

  return (
    <footer>
      <div className="container"></div>
    </footer>
  )
}

const select = (state) => {
  return {
  }
}

export default connect(select)(Footer)

