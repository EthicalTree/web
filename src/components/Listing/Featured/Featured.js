import './Featured.css'

import React from 'react'
import PropTypes from 'prop-types'

import { Col, Row, } from 'reactstrap'
import { Result } from '../../Search/Result'

import { listingProps } from '../../../utils/types'

export const Featured = props => {
  const { featuredListings, ...rest } = props

  if (featuredListings.length < 1) {
    return null
  }

  return (
    <div className="listing-featured-listings">
      <h5 className="pt-3 pb-3">Featured Listings</h5>

      <Row>
        {featuredListings.map(l => {
          return (
            <Col {...rest} key={l.id}>
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
  featuredListings: PropTypes.arrayOf(PropTypes.shape(listingProps)),
  xs: PropTypes.number,
  md: PropTypes.number,
}

Featured.defaultProps = {
  featuredListings: [],
  xs: 12,
  md: 6
}

export default Featured
