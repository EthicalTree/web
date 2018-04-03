import './CuratedList.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Result } from '../Search/Result'

export const CuratedList = props => {
  const { listings, name, slug } = props

  return (
    <div className="curated-list">
      <div className="curated-list-title d-flex align-items-center">
        <h4 className="list-name">{name}</h4>

        <span className="divider">|</span>

        <Link
          to={`/collections/${slug}`}
          className="see-more-link"
        >
          See all
        </Link>
      </div>

      <div className="listings">
        {listings.map(l => {
          return (
            <Result key={l.id} listing={l} />
          )
        })}
      </div>
    </div>
  )
}

CuratedList.propTypes = {
  id: PropTypes.number.isRequired,
  listings: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
}

export default CuratedList
