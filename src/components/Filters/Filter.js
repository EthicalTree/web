import './Filter.css'
import React from 'react'
import classnames from 'classnames'

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
          }}
        />
        <label className="form-check-label" htmlFor="openNow">
          Open Now
        </label>
      </div>
    </div>
  )
}
