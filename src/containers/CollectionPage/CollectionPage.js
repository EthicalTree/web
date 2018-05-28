import './CollectionPage.css'

import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { Helmet } from 'react-helmet'

import { Loader } from '../../components/Loader'
import { Result } from '../../components/Search/Result'
import { Paginator } from '../../components/Paginator'
import { Featured } from '../../components/Listing/Featured'

import { getCollection } from '../../actions/collection'
import { setSearchLocation } from '../../actions/search'

export class CollectionPage extends React.Component {

  componentDidMount() {
    const { dispatch, match, user } = this.props
    const { city } = match.params

    if (city.toLowerCase() !== user.city.toLowerCase()) {
      dispatch(setSearchLocation(city))
    }

    this.fetchCollection()
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props
    const didLocationChange = user.location !== prevProps.user.location

    if (didLocationChange) {
      this.fetchCollection()
    }
  }

  fetchCollection() {
    const { dispatch, match } = this.props

    dispatch(getCollection({
      slug: match.params.slug,
      page: 1
    }))
  }

  render() {
    const { dispatch, collection, user } = this.props

    return (
      <div className="collection-page">
        <Loader
          loading={collection.isLoading}
          fixed={true}
          render={() => (
            <React.Fragment>
              <Helmet>
                <title>{`${user.city}'s ${collection.name} - Best Local Restaurants, Shops and More · EthicalTree`}</title>
                <meta
                  name="description"
                  content={`${collection.description}`}
                />
              </Helmet>

              <div className="text-center">
                <h2 className="collection-title">
                  {collection.name} ({ user.city })
                </h2>

                {collection.description &&
                  <h5 className="collection-description">
                    {collection.description}
                  </h5>
                }
              </div>

              <div className="collection-listings">
                {collection.listings.map(l => {
                  return (
                    <div key={l.id} className="collection-listing">
                      <Result
                        listing={l}
                        location="Collection Page"
                      />
                    </div>
                  )
                })}

                {collection.listings.length === 0 &&
                  <i>There are no listings in this collection for your selected location.</i>
                }
              </div>

              <Paginator
                className="text-center"
                pageCount={collection.totalPages}
                currentPage={collection.currentPage}
                onPageChange={data => dispatch(getCollection({
                  slug: collection.slug,
                  page: data.selected
                }))}
              />

              <Container className="mb-4">
                <Featured
                  lg={3}
                />
              </Container>
            </React.Fragment>
          )}
        />
      </div>
    )
  }
}

const select = state => ({
  collection: state.collection,
  user: state.user
})

export default connect(select)(CollectionPage)
