import './MapSwitcher.css'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'

const MapSwitcher = props => {
  const { dispatch, mode } = props

  return (
    <div className="map-switcher">
      <Button
        color="default"
        onClick={() => dispatch({ type: 'TOGGLE_SEARCH_RESULTS_MODE' })}>
        {mode === 'map' ? 'Show Search Results' : 'Show Map'}
      </Button>
    </div>
  )
}

MapSwitcher.propTypes = {
  mode: PropTypes.oneOf(['map', 'listing']),
}

MapSwitcher.defaultProps = {
  mode: 'listing',
}

const select = state => {
  return {
    search: state.search,
  }
}

export default connect(select)(MapSwitcher)
