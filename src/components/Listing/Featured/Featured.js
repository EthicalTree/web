import './Featured.css'

import querystring from 'querystring'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Col, Row } from 'reactstrap'
import { Result } from '../../Search/Result'
import { Loader } from '../../Loader'
import { api } from '../../../utils/api'

export class Featured extends React.Component {
  state = {
    featuredListings: [],
    loading: true,
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
    const data = {
      count,
      location: location.city,
      is_featured: true,
    }

    this.setState({ loading: true })

    api
      .get(`/v1/listings?${querystring.stringify(data)}`)
      .then(({ data }) => {
        this.setState({ loading: false, featuredListings: data.listings })
      })
      .catch(() => {})
  }

  render() {
    const { session, xs, sm, md, lg, xl, xxl } = this.props
    const { loading, featuredListings } = this.state

    return (
      <Loader className="featured-listings" loading={loading}>
        <h5 className="featured-listings-header">Featured</h5>

        <Row>
          {featuredListings.map(l => {
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
  session: state.session,
})

Featured.propTypes = {
  count: PropTypes.number,
  xs: PropTypes.number,
  md: PropTypes.number,
}

Featured.defaultProps = {
  count: 4,
  xs: 12,
  md: 6,
}

export default connect(select)(Featured)
