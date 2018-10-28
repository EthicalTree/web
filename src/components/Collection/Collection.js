import './Collection.css'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Result, ResultSkeleton } from '../Search/Result'
import { CollectionTitleSkeleton } from './CollectionTitleSkeleton'

import { trackEvent } from '../../utils/ga'
import { genDummyList } from '../../utils/skeleton'

export const Collection = props => {
  const { city, listings, name, session, slug } = props

  if (listings && !listings.length > 0) {
    return null
  }

  const collectionLink = city
    ? `/collections/${city.toLowerCase()}/${slug}`
    : `/collections/_/${slug}`
  const title = city ? `${city} ${name}` : name

  return (
    <div className="collection">
      <div className="collection-title-title d-flex align-items-center">
        {listings == null && (
          <div>
            <CollectionTitleSkeleton style={{ width: '100%' }} />
          </div>
        )}
        {listings && (
          <Fragment>
            <h4 className="list-name">{title}</h4>

            <span className="divider">|</span>

            <Link
              to={collectionLink}
              className="see-more-link"
              onClick={() => {
                trackEvent({
                  action: 'View Collection',
                  category: 'Collections',
                  label: name,
                })
              }}
            >
              See all
            </Link>
          </Fragment>
        )}
      </div>

      <div className="listings">
        {listings == null &&
          genDummyList(4).map(x => <ResultSkeleton key={x} className="listing-result" />)}

        {listings &&
          listings.map(l => (
            <Result
              key={l.id}
              listing={l}
              location="Collection"
              session={session}
            />
          ))}
      </div>
    </div>
  )
}

Collection.propTypes = {
  city: PropTypes.string,
  listings: PropTypes.array,
  session: PropTypes.object,
}

export default Collection
