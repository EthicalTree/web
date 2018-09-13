import './CollectionPage.css'

import React from 'react'
import classnames from 'classnames'
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
    const { dispatch, match } = this.props
    const { city } = match.params

    dispatch(setSearchLocation({ location: city }))

    this.fetchCollection()
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props
    const didLocationChange = search.location !== prevProps.search.location

    if (didLocationChange) {
      this.fetchCollection()
    }
  }

  fetchCollection() {
    const { dispatch, match, search } = this.props

    dispatch(
      getCollection({
        location: search.location,
        slug: match.params.slug,
        page: 1,
      })
    )
  }

  render() {
    const { dispatch, collection, session, search } = this.props

    const title = search.location
      ? `${search.location.city}'s ${
          collection.name
        } - Best Local Restaurants, Shops and More · EthicalTree`
      : `${
          collection.name
        } - Best Local Restaurants, Shops and More · EthicalTree`

    const collectionTitle = search.location
      ? `${collection.name} (${search.location.city})`
      : `${collection.name}`
    let headerStyles

    if (collection.coverImage) {
      headerStyles = {
        backgroundImage: `url(${collection.coverImage.url})`,
      }
    }

    return (
      <div className="collection-page">
        <Loader
          loading={collection.isLoading}
          fixed={true}
          render={() => (
            <React.Fragment>
              <Helmet>
                <title>{title}</title>
                <meta
                  name="description"
                  content={`${collection.description}`}
                />
              </Helmet>

              <div
                className={classnames('collection-header', 'text-center', {
                  'has-image': collection.coverImage,
                })}
                style={headerStyles}>
                <div className="collection-banner">
                  <h2 className="collection-title">{collectionTitle}</h2>

                  {collection.description && (
                    <h5 className="collection-description">
                      {collection.description}
                    </h5>
                  )}
                </div>
              </div>

              <div className="collection-listings">
                {collection.listings.map(l => {
                  return (
                    <div key={l.id} className="collection-listing">
                      <Result
                        listing={l}
                        location="Collection Page"
                        session={session}
                      />
                    </div>
                  )
                })}

                {collection.listings.length === 0 && (
                  <i>
                    There are no listings in this collection for your selected
                    location.
                  </i>
                )}
              </div>

              <Paginator
                className="text-center"
                pageCount={collection.totalPages}
                currentPage={collection.currentPage}
                onPageChange={data =>
                  dispatch(
                    getCollection({
                      slug: collection.slug,
                      page: data.selected,
                    })
                  )
                }
              />

              <Container className="mb-4">
                <Featured lg={3} />
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
  session: state.session,
  search: state.search,
})

export default connect(select)(CollectionPage)
