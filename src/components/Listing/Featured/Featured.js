import './Featured.css'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Col, Row } from 'reactstrap'
import { Result } from '../../Search/Result'
import { Loader } from '../../Loader'

import { getFeaturedListings } from '../../../actions/search'

export class Featured extends React.Component {
  componentDidMount() {
    this.fetchListings()
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props

    if (search.location.name !== prevProps.search.location.name) {
      this.fetchListings()
    }
  }

  fetchListings() {
    const { count, dispatch, search } = this.props
    dispatch(getFeaturedListings({ count, location: search.location }))
  }

  render() {
    const {
      search,
      session,
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      hoveredResult,
    } = this.props

    return (
      <Loader
        className="featured-listings"
        loading={search.featured.length === 0 && search.featuredListingsLoading}
      >
        <h5 className="featured-listings-header">Featured</h5>

        <Row>
          {search.featured.map(l => {
            return (
              <Col
                className={`col-xxl-${xxl}`}
                xs={xs}
                sm={sm}
                md={md}
                lg={lg}
                xl={xl}
                key={l.id}
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
      </Loader>
    )
  }
}

const select = state => ({
  search: state.search,
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
