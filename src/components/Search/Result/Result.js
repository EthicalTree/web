import './Result.css'

import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Link } from 'react-router-dom'

import { Card, CardBody, CardTitle } from 'reactstrap'

import { EthicalityIcon } from '../../Ethicality/Ethicality'
import { OpenClose } from '../../OpenClose'

import { listingProps } from '../../../utils/types'
import { trackEvent } from '../../../utils/ga'
import { getDistance, getGeoLocation } from '../../../utils/location'
import { localizedDates } from '../../../models/hours'

export class Result extends React.Component {
  constructor(props) {
    super(props)

    const { listing } = props

    this.state = {
      currentImage: listing.images[0],
    }
  }

  render() {
    const { className, hovered, listing, location } = this.props

    const { currentImage } = this.state

    const extraStyle = currentImage
      ? { backgroundImage: `url(${currentImage.thumbnailUrl})` }
      : {}
    const hoveredClass = hovered ? 'hovered' : ''

    const geoLocation = getGeoLocation()

    const distance = geoLocation
      ? getDistance(
          geoLocation.lat,
          geoLocation.lng,
          listing.location.lat,
          listing.location.lng
        )
      : null

    return (
      <Link
        to={`/listings/${listing.city}/${listing.slug}`}
        className="listing-result"
        onClick={() => {
          trackEvent({
            action: 'Clicked listing',
            category: 'Listing',
            label: location,
          })
        }}
      >
        <Card className={`hoverable ${hoveredClass} ${className}`}>
          <div className="card-img" style={extraStyle}>
            {listing.plan && (
              <span className="featured-badge">
                Supporter
                <span className="triangle" />
              </span>
            )}
          </div>
          <CardBody>
            <CardTitle className="result-title">
              <span className="text-truncate mb-2">{listing.title}</span>

              <div className="ethicalities mb-2 d-flex">
                {listing.ethicalities.map(ethicality => {
                  return (
                    <EthicalityIcon
                      ethicalityKey={ethicality.iconKey}
                      key={ethicality.iconKey}
                    />
                  )
                })}
              </div>
            </CardTitle>

            <div className="d-flex justify-content-between">
              <OpenClose
                hours={localizedDates(listing.operatingHours, listing.timezone)}
                timezone={listing.timezone}
              />
              <span className="listing-distance">
                {distance && `${numeral(distance).format('0.0')} km`}
              </span>
            </div>
          </CardBody>
        </Card>
      </Link>
    )
  }
}

Result.propTypes = {
  listing: PropTypes.shape(listingProps),
  location: PropTypes.string,
}

Result.defaultProps = {
  className: '',
  smallView: false,
}

export default Result
