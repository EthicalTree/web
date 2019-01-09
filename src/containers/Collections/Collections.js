import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

import { Collection } from '../../components/Collection'
import { getCollections } from '../../actions/collections'

import { CollectionSkeleton } from '../../components/Collection/CollectionSkeleton'
import { genDummyList } from '../../utils/skeleton'

import './Collections.css'

const Column = ({ children }) => (
  <Col className={`col-xxl-4`} xs={12} sm={12} md={12} lg={4} xl={4}>
    {children}
  </Col>
)

export class Collections extends React.Component {
  componentDidMount() {
    const { dispatch, search } = this.props
    dispatch(getCollections({ where: 'front_page', location: search.location }))
  }

  componentDidUpdate(prevProps) {
    const { dispatch, search } = this.props

    if (search.location !== prevProps.search.location) {
      dispatch(
        getCollections({ where: 'front_page', location: search.location })
      )
    }
  }

  render() {
    const { collections, search } = this.props
    const city = search.location ? search.location.city : ''

    const trimmedCollections =
      collections.collections.length > 5
        ? collections.collections.slice(0, 5)
        : collections.collections

    return (
      <Fragment>
        <h3 className="collections-title">{`Collections (${city})`}</h3>
        <Row className="collections">
          {collections.isLoading &&
            genDummyList(6).map(x => (
              <Column key={x}>
                <CollectionSkeleton
                  className="collection"
                  style={{ background: 'none' }}
                />
              </Column>
            ))}

          {!collections.isLoading && (
            <Fragment>
              {trimmedCollections.map(c => (
                <Column key={c.id}>
                  <Collection collection={c} city={city} />
                </Column>
              ))}
              {collections.collections.length > 5 && (
                <Column>
                  <Link
                    className="collection see-all-collections"
                    to={`/collections/${city}`}
                  >
                    <span className="collection-label">
                      See all collections
                    </span>
                  </Link>
                </Column>
              )}
            </Fragment>
          )}
        </Row>
      </Fragment>
    )
  }
}

const select = state => ({
  collections: state.collections,
  session: state.session,
  search: state.search,
})

export default connect(select)(Collections)
