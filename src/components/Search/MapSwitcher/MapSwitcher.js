import './MapSwitcher.css'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'

const MapSwitcher = props => {
  const { mode, onClick, showText } = props

  return (
    <div className="map-switcher">
      <Button color="default" onClick={onClick}>
        {mode === 'map' ? showText : 'Show Map'}
      </Button>
    </div>
  )
}

MapSwitcher.propTypes = {
  mode: PropTypes.oneOf(['map', 'listing']),
  onClick: PropTypes.func,
  showText: PropTypes.string.isRequired,
}

MapSwitcher.defaultProps = {
  mode: 'listing',
  onClick: () => {},
}

const select = state => {
  return {
    search: state.search,
  }
}

export default connect(select)(MapSwitcher)
