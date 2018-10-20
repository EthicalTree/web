import './Featured.css'

import querystring from 'querystring'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Col, Row } from 'reactstrap'
import { Result } from '../../Search/Result'
import { api } from '../../../utils/api'

import { getListOrDummy } from '../../../utils/skeleton'

export class Featured extends React.Component {
  state = {
    featuredListings: null,
  }

  componentDidMount() {
    this.fetchListings()
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props

    if (location !== prevProps.location) {
      this.fetchListings()
    }
  }

  fetchListings() {
    const { count, location } = this.props

    if (!location) {
      return
    }

    const data = {
      count,
      location: location.city,
      is_featured: true,
    }

    this.setState({ featuredListings: null })

    api
      .get(`/v1/listings?${querystring.stringify(data)}`)
      .then(({ data }) => {
        this.setState({ featuredListings: data.listings })
      })
      .catch(() => {})
  }

  render() {
    const { session, xs, sm, md, lg, xl, xxl, hoveredResult } = this.props
    const { featuredListings } = this.state

    return (
      <div className="featured-listings">
        <h5 className="featured-listings-header">Featured</h5>

        <Row>
          {getListOrDummy(featuredListings, 4).map((l, i) => {
            return (
              <Col
                className={`col-xxl-${xxl}`}
                xs={xs}
                sm={sm}
                md={md}
                lg={lg}
                xl={xl}
                key={i}
              >
                <Result
                  listing={l}
                  hovered={l.slug === hoveredResult}
                  location="Featured Listing"
                  session={session}
                />
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
}

const select = state => ({
  session: state.session,
})

Featured.propTypes = {
  count: PropTypes.number,
  xs: PropTypes.number,
  md: PropTypes.number,
  hoveredResult: PropTypes.string,
  location: PropTypes.object,
}

Featured.defaultProps = {
  count: 4,
  xs: 12,
  md: 6,
}

export default connect(select)(Featured)
