import './Result.css'

import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import head from 'lodash/head'

import { Link } from 'react-router-dom'

import { Card, CardBody, CardTitle } from 'reactstrap'

import { EthicalityIcon } from '../../Ethicality/Ethicality'
import { OpenClose } from '../../OpenClose'
import { ResultSkeleton } from './ResultSkeleton'

import { listingProps } from '../../../utils/types'
import { trackEvent } from '../../../utils/ga'
import { getDistance, getGeoLocation } from '../../../utils/location'

export class Result extends React.Component {
  constructor(props) {
    super(props)

    const { listing } = props

    this.state = {
      currentImage: head(listing.images),
    }
  }

  _calcDistance(listing) {
    const geoLocation = getGeoLocation()

    return geoLocation
      ? getDistance(
          geoLocation.lat,
          geoLocation.lng,
          listing.location.lat,
          listing.location.lng
        )
      : null
  }

  render() {
    const { className, hovered, listing, location } = this.props

    if (!listing.id) return <ResultSkeleton />

    const { currentImage } = this.state

    const extraStyle = currentImage
      ? { backgroundImage: `url(${currentImage.thumbnailUrl})` }
      : {}
    const hoveredClass = hovered ? 'hovered' : ''

    const distance = listing.location ? this._calcDistance(listing) : null

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
                hours={listing.operatingHours}
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
