import React from 'react'
import { connect } from 'react-redux'

import { Loader } from '../../components/Loader'
import { Collection } from '../../components/Collection'
import { getCollections } from '../../actions/collections'

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

    return (
      <Loader loading={collections.isLoading} className="collections">
        {collections.collections.map(cl => {
          return (
            <Collection
              city={location ? location.city : null}
              key={cl.id}
              session={session}
              {...cl}
            />
          )
        })}
      </Loader>
    )
  }
}

const select = state => ({
  collections: state.collections,
  session: state.session,
  search: state.search,
})

export default connect(select)(Collections)
