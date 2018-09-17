import React from 'react'
import { OverlayView } from 'react-google-maps'
import CustomOverlayView from './CustomOverlayView'
import { Result } from '../../Search/Result'

const ListingOverlay = ({ listing, session }) => {
  return (
    <CustomOverlayView
      position={listing.location}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => {
        return {
          x: -(width / 2),
          y: -(height + 45),
        }
      }}
    >
      <Result
        className="result-overlay"
        key={listing.slug}
        listing={listing}
        location="Search Results Map"
        smallView={true}
        session={session}
      />
    </CustomOverlayView>
  )
}

export default ListingOverlay
