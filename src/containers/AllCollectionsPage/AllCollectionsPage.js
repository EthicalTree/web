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
    const { dispatch, match, user } = this.props
    const { city } = match.params

    if (city.toLowerCase() !== user.city.toLowerCase()) {
      dispatch(setSearchLocation(city, city))
    } else {
      dispatch(getCollections({}))
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, history, search, user } = this.props

    if (search.location !== prevProps.search.location) {
      dispatch(getCollections({}))
    }

    if (user.city !== prevProps.user.city) {
      history.push(`/collections/${user.city.toLowerCase()}`)
    }
  }

  render() {
    const { dispatch, user, collections } = this.props

    return (
      <div className="all-collections-page">
        <Loader loading={collections.isLoading} fixed={true}>
          <Helmet>
            <title>{`${
              user.city
            } Collections - Best Local Restaurants, Shops and More · EthicalTree`}</title>
            <meta
              name="description"
              content={`Discover the best restaurants, bakeries, cafés and stores. Organic, Woman-Owned, Fair Trade, Vegan, Vegetarian.`}
            />
          </Helmet>

          <h2 className="all-collections-title text-center">
            Collections ({user.city})
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
                  to={`/collections/${user.city.toLowerCase()}/${c.slug}`}>
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
  user: state.user,
  collections: state.collections,
  search: state.search,
})

export default connect(select)(AllCollectionsPage)
