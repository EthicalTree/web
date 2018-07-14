import React from 'react'
import PropTypes from 'prop-types'
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'

const ETInfoBox = props => {
  const {
    location,
    children
  } = props

  console.log(location.latitude);
  return (
    <InfoBox defaultPosition={{lat: location.latitude, lng: location.longitude}}>
      {children}
    </InfoBox>
  )
}

ETInfoBox.propTypes = {
  location: PropTypes.object,
}

export default ETInfoBox
