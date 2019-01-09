import './Collection.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { trackEvent } from '../../utils/ga'

export const Collection = ({ collection, city }) => {
  let extraStyle

  if (collection.listings.length === 0) {
    return null
  }

  if (collection.coverImage) {
    extraStyle = {
      backgroundImage: `url(${collection.coverImage.thumbnailUrl})`,
    }
  }

  return (
    <Link
      key={collection.id}
      className="collection"
      style={extraStyle}
      to={
        city
          ? `/collections/${city}/${collection.slug}`
          : `/collections/_/${collection.slug}`
      }
      onClick={() => {
        trackEvent({
          action: 'View Collection',
          category: 'Collections',
          label: collection.name,
        })
      }}
    >
      <span className="collection-label">{collection.name}</span>
    </Link>
  )
}

Collection.propTypes = {
  city: PropTypes.string,
}

export default Collection
