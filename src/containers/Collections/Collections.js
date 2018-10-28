import React from 'react'
import { connect } from 'react-redux'

import { Collection } from '../../components/Collection'
import { getCollections } from '../../actions/collections'

import { genDummyList } from '../../utils/skeleton'

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
    const { collections, session, search } = this.props
    const { location } = search

    const realCollections = collections.isLoading
      ? genDummyList(2)
      : collections.collections

    return (
      <div className="collections">
        {realCollections.map((cl, i) => (
          <Collection
            city={location ? location.city : null}
            key={i}
            session={session}
            {...cl}
          />
        ))}
      </div>
    )
  }
}

const select = state => ({
  collections: state.collections,
  session: state.session,
  search: state.search,
})

export default connect(select)(Collections)
