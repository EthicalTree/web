import './Footer.sass'

import React from 'react'
import { connect } from 'react-redux'

const Footer = (props) => {
  const { header } = props

  if (header.isFixed) {
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
    header: state.header
  }
}

export default connect(select)(Footer)

