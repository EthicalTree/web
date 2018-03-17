import './Result.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  Card,
  CardBody,
  CardTitle
} from 'reactstrap'

import { EthicalityIcon } from '../../Ethicality/Ethicality'
import OpenClose from '../../Util/DateTime/OpenClose'

import { listingProps } from '../../../utils/types'
import { s3Url } from '../../../utils/s3'
import { localizedDates } from '../../../models/hours'

export class Result extends React.Component {

  constructor(props) {
    super(props)

    const { listing } = props

    this.state = {
      currentImage: listing.images[0]
    }
  }

  render() {
    const { listing, hovered, className } = this.props
    const { currentImage } = this.state

    const extraStyle = currentImage ? { backgroundImage: `url(${s3Url('thumbnail', currentImage.key)})` }  : {}
    const hoveredClass = hovered ? 'hovered' : ''

    return (
      <Link to={`/listings/${listing.slug}`} className="listing-result">
        <Card className={`hoverable ${hoveredClass} ${className}`}>
          <div
            className="card-img"
            style={extraStyle}
          >
            {listing.plan &&
              <span className="featured-badge">
                Featured
                <span className="triangle" />
              </span>
            }
          </div>
          <CardBody>
            <CardTitle className="result-title">
              <span
                className="text-truncate mb-2"
              >
                {listing.title}
              </span>

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

            <OpenClose hours={localizedDates(listing.operatingHours)} />
          </CardBody>
        </Card>
      </Link>
    )
  }

}

Result.propTypes = {
  listing: PropTypes.shape(listingProps)
}

Result.defaultProps = {
  className: '',
  smallView: false
}

export default Result
