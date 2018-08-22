import './Filter.css'
import React from 'react'
import classnames from 'classnames'
import { trackEvent } from '../../utils/ga'

export const FilterBar = props => {
  const { className, openNow, dispatch } = props

  const classNames = classnames('filter-bar', className)

  return (
    <div className={classNames}>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="openNow"
          checked={openNow || false}
          onChange={e => {
            dispatch({
              type: 'SET_SEARCH_QUERY_PARAMS',
              data: {
                openNow: !openNow,
              },
            })
            dispatch({ type: 'SET_SEARCH_PENDING', data: true })

            const label = !openNow
              ? 'Start filtering by Open Now'
              : 'Stop filtering by Open Now'
            trackEvent({
              action: 'Clicked Open Now',
              category: 'Search',
              label: label,
            })
          }}
        />
        <label className="form-check-label" htmlFor="openNow">
          Open Now
        </label>
      </div>
    </div>
  )
}
