import './Featured.css'

import React from 'react'
import PropTypes from 'prop-types'

import { Col, Row, } from 'reactstrap'
import { Result } from '../../Search/Result'

import { listingProps } from '../../../utils/types'

export const Featured = props => {
  const { featuredListings } = props

  if (featuredListings.length < 1) {
    return null
  }

  return (
    <div className="listing-featured-listings">
      <h5 className="pt-3 pb-3">Featured Listings</h5>

      <Row>
        {featuredListings.map(l => {
          return (
            <Col xs="12" md="6" key={l.id}>
              <Result
                listing={l}
                location="Featured Listing"
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

Featured.propTypes = {
  featuredListings: PropTypes.arrayOf(PropTypes.shape(listingProps))
}

Featured.defaultProps = {
  featuredListings: []
}

export default Featured
