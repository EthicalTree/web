import './AllCollectionsPage.css'

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Loader } from '../../components/Loader'

import { getCollections } from '../../actions/collection'

export class AllCollectionsPage extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(getCollections())
  }

  componentDidUpdate(nextProps) {
    const { dispatch, search } = this.props

    if (search.location !== nextProps.search.location) {
      dispatch(getCollections())
    }
  }

  render() {
    const { user, collections } = this.props

    return (
      <div className="all-collections-page">
        <Loader
          loading={collections.isLoading}
          fixed={true}
        >
          <Helmet>
            <title>{`${user.city} Collections - Best Local Restaurants, Shops and More · EthicalTree`}</title>
            <meta
              name="description"
              content={`Discover the best restaurants, bakeries, cafés and stores. Organic, Woman-Owned, Fair Trade, Vegan, Vegetarian.`}
            />
          </Helmet>

          <h2 className="all-collections-title text-center">
            Collections ({ user.city })
          </h2>

          <div className="collections">
            {collections.collections.map(c => {
              let extraStyle

              if (c.listings.length === 0) {
                return null
              }

              if (c.coverImage) {
                extraStyle = {
                  backgroundImage: `url(${c.coverImage.thumbnailUrl})`
                }
              }

              return (
                <Link
                  key={c.id}
                  className="collection"
                  style={extraStyle}
                  to={`/collections/${user.city.toLowerCase()}/${c.slug}`}
                >
                  <span className="collection-label">
                    {c.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </Loader>
      </div>
    )
  }
}

const select = state => ({
  user: state.user,
  collections: state.collections,
  search: state.search
})

export default connect(select)(AllCollectionsPage)
