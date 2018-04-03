import './AllCollectionsPage.css'

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Loader } from '../../components/Loader'

import { getCuratedLists } from '../../actions/curatedList'

export class AllCollectionsPage extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(getCuratedLists())
  }

  render() {
    const { collections } = this.props

    return (
      <div className="all-collections-page">
        <Loader
          loading={collections.isLoading}
          fixed={true}
        >
          <h2 className="all-collections-title text-center">
            Collections
          </h2>

          <div className="collections">
            {collections.collections.map(c => {
              return (
                <Link
                  key={c.id}
                  to={`/collections/${c.slug}`}
                  className="collection"
                >
                  {c.name}
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
  collections: state.collections
})

export default connect(select)(AllCollectionsPage)
