import './Filter.css'
import React from 'react'
import classnames from 'classnames'
import { Input } from 'reactstrap'
import { trackEvent } from '../../utils/ga'
import { setSearchUrl } from '../../actions/search'

export const FilterBar = props => {
  const { className, dispatch, search } = props

  const classNames = classnames('filter-bar', className)

  return (
    <div className={classNames}>
      <div className="form-check">
        <Input
          className="form-check-input"
          type="checkbox"
          id="openNow"
          checked={search.openNow || false}
          onChange={() => {
            const label = !search.openNow
              ? 'Start filtering by Open Now'
              : 'Stop filtering by Open Now'
            trackEvent({
              action: 'Clicked Open Now',
              category: 'Search',
              label: label,
            })
            dispatch(
              setSearchUrl(search, {
                openNow: !search.openNow,
              })
            )
          }}
        />
        <label className="form-check-label" htmlFor="openNow">
          Open Now
        </label>
      </div>
    </div>
  )
}
