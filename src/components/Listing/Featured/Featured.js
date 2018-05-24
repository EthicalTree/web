import './Featured.css'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Col, Row, } from 'reactstrap'
import { Result } from '../../Search/Result'
import { Loader } from '../../Loader'

import { getFeaturedListings } from '../../../actions/search'

export class Featured extends React.Component {

  componentDidMount() {
    const { count, dispatch } = this.props
    dispatch(getFeaturedListings({ count }))
  }

  render() {
    const { dispatch, search, xxl, ...rest } = this.props

    if (search.featured.length < 1) {
      return null
    }

    return (
      <Loader
        className="featured-listings"
        loading={search.featuredListingsLoading}
      >
        <h5 className="featured-listings-header pt-3 pb-3">
          Featured
        </h5>

        <Row>
          {search.featured.map(l => {
            return (
              <Col className={`col-xxl-${xxl}`} {...rest} key={l.id}>
                <Result
                  listing={l}
                  location="Featured Listing"
                />
              </Col>
            )
          })}
        </Row>
      </Loader>
    )
  }
}

const select = state => ({
  search: state.search
})

Featured.propTypes = {
  count: PropTypes.number,
  xs: PropTypes.number,
  md: PropTypes.number,
}

Featured.defaultProps = {
  count: 4,
  xs: 12,
  md: 6
}

export default connect(select)(Featured)
