import React from 'react'
import { connect } from 'react-redux'

import { Loader } from '../../components/Loader'
import { Collection } from '../../components/Collection'
import { getCollections } from '../../actions/collections'

export class Collections extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCollections())
  }

  componentDidUpdate(prevProps) {
    const { dispatch, user } = this.props

    if (user.location !== prevProps.user.location) {
      dispatch(getCollections())
    }
  }

  render() {
    const { collections, user } = this.props

    return (
      <Loader
        loading={collections.isLoading}
        className="collections"
      >
        {collections.collections.map(cl => {
          return (
            <Collection
              city={user.city}
              key={cl.id}
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
  user: state.user
})

export default connect(select)(Collections)
