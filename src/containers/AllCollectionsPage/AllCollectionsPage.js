import './AllCollectionsPage.css'

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Loader } from '../../components/Loader'
import { Paginator } from '../../components/Paginator'

import { getCollections } from '../../actions/collections'
import { setSearchLocation } from '../../actions/search'

export class AllCollectionsPage extends React.Component {
  componentDidMount() {
    const { dispatch, match, search } = this.props
    const { city } = match.params

    if (city.toLowerCase() !== search.location.city.toLowerCase()) {
      dispatch(setSearchLocation({ location: city }))
    } else {
      dispatch(getCollections({ location: search.location }))
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, history, search } = this.props
    const { location } = search

    if (location !== prevProps.search.location) {
      dispatch(getCollections({ location }))
    }

    if (location.city !== prevProps.search.location.city) {
      history.push(`/collections/${location.city}`)
    }
  }

  render() {
    const { dispatch, collections, search } = this.props
    const city = search.location ? search.location.city : ''

    const title = city
      ? `${city} Collections - Best Local Restaurants, Shops and More · EthicalTree`
      : 'Collections - Best Local Restaurants, Shops and More · EthicalTree'

    const collectionsTitle = city ? `Collections (${city})` : 'Collections'

    return (
      <div className="all-collections-page">
        <Loader loading={collections.isLoading} fixed={true}>
          <Helmet>
            <title>{title}</title>
            <meta
              name="description"
              content={
                'Discover the best restaurants, bakeries, cafés and stores. Organic, Woman-Owned, Fair Trade, Vegan, Vegetarian.'
              }
            />
          </Helmet>

          <h2 className="all-collections-title text-center">
            {collectionsTitle}
          </h2>

          <div className="collections">
            {collections.collections.map(c => {
              let extraStyle

              if (c.listings.length === 0) {
                return null
              }

              if (c.coverImage) {
                extraStyle = {
                  backgroundImage: `url(${c.coverImage.thumbnailUrl})`,
                }
              }

              return (
                <Link
                  key={c.id}
                  className="collection"
                  style={extraStyle}
                  to={
                    city
                      ? `/collections/${city}/${c.slug}`
                      : `/collections/_/${c.slug}`
                  }>
                  <span className="collection-label">{c.name}</span>
                </Link>
              )
            })}

            <Paginator
              className="text-center"
              pageCount={collections.totalPages}
              currentPage={collections.currentPage}
              onPageChange={data =>
                dispatch(
                  getCollections({
                    page: data.selected,
                  })
                )
              }
            />
          </div>
        </Loader>
      </div>
    )
  }
}

const select = state => ({
  collections: state.collections,
  search: state.search,
})

export default connect(select)(AllCollectionsPage)
