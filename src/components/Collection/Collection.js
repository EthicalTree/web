import './Collection.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Result } from '../Search/Result'
import { trackEvent } from '../../utils/ga'

export const Collection = props => {
  const { city, listings, name, session, slug } = props

  if (!listings.length > 0) {
    return null
  }

  const collectionLink = city
    ? `/collections/${city.toLowerCase()}/${slug}`
    : `/collections/_/${slug}`
  const title = city ? `${name} (${city})` : name

  return (
    <div className="collection">
      <div className="collection-title-title d-flex align-items-center">
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
          }}>
          See all
        </Link>
      </div>

      <div className="listings">
        {listings.map(l => {
          return (
            <Result
              key={l.id}
              listing={l}
              location="Collection"
              session={session}
            />
          )
        })}
      </div>
    </div>
  )
}

Collection.propTypes = {
  city: PropTypes.string,
  listings: PropTypes.array.isRequired,
  session: PropTypes.object,
}

export default Collection
