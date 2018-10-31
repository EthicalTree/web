import './AllCollectionsPage.css'

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Jumbotron } from 'reactstrap'

import { Paginator } from '../../components/Paginator'

import { getCollections } from '../../actions/collections'
import { setSearchLocation } from '../../actions/search'

import { CollectionSkeleton } from '../../components/Collection/CollectionSkeleton'

import { getSeoText } from '../../utils/seo'
import { genDummyList } from '../../utils/skeleton'

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

    const collectionsTitle = city ? `${city} Collections` : 'Collections'

    return (
      <div className="all-collections-page">
        <Helmet>
          <title>{getSeoText('title', title)}</title>
          <meta
            name="description"
            content={getSeoText(
              'description',
              'Discover the best restaurants, bakeries, cafés and stores. Organic, Woman-Owned, Fair Trade, Vegan, Vegetarian.'
            )}
          />
        </Helmet>

        <Jumbotron>
          <h1>{getSeoText('header', collectionsTitle)}</h1>
        </Jumbotron>

        <div className="collections">
          {collections.isLoading &&
            genDummyList(12).map(x => (
              <CollectionSkeleton
                className="collection"
                style={{ background: 'none' }}
                key={x}
              />
            ))}

          {!collections.isLoading &&
            collections.collections.map(c => {
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
                  }
                >
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
                  location: search.location,
                  page: data.selected,
                })
              )
            }
          />
        </div>
      </div>
    )
  }
}

const select = state => ({
  collections: state.collections,
  search: state.search,
})

export default connect(select)(AllCollectionsPage)
