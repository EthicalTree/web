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

    const extraStyle = currentImage ? { backgroundImage: `url(${process.env.REACT_APP_S3_URL}/${currentImage.key})` }  : {}
    const hoveredClass = hovered ? 'hovered' : ''

    return (
      <Link to={`/listings/${listing.slug}`} className="listing-result">
        <Card className={`hoverable ${hoveredClass} ${className}`}>
          <div
            className="card-img"
            style={extraStyle}
          >
          </div>
          <CardBody>
            <CardTitle className="d-flex justify-content-between flex-row-reverse">
              <div className="ethicalities d-flex">
                {listing.ethicalities.map(ethicality => {
                  return (
                    <EthicalityIcon
                      className="ml-2"
                      ethicalityKey={ethicality.iconKey}
                      key={ethicality.iconKey}
                    />
                  )
                })}
              </div>
              <span className="text-truncate">
                {listing.title}
              </span>
            </CardTitle>

            {listing.openStatus &&
              <OpenClose status={listing.openStatus} />
            }
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
