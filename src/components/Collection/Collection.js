import './Collection.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Result } from '../Search/Result'
import { trackEvent } from '../../utils/ga'

export const Collection = props => {
  const {
    city,
    listings,
    name,
    session,
    slug
  } = props

  if (!listings.length > 0) {
    return null
  }

  const collectionLink = `/collections/${city.toLowerCase()}/${slug}`

  return (
    <div className="collection">
      <div className="collection-title-title d-flex align-items-center">
        <h4 className="list-name">
          {name} ({ city })
        </h4>

        <span className="divider">|</span>

        <Link
          to={collectionLink}
          className="see-more-link"
          onClick={() => {
            trackEvent({
              action: 'View Collection',
              category: 'Collections',
              label: name
            })
          }}
        >
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
  city: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  listings: PropTypes.array.isRequired,
  location: PropTypes.object,
  name: PropTypes.string.isRequired,
  session: PropTypes.object
}

export default Collection
