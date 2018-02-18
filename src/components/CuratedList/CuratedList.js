import './CuratedList.css'

import React from 'react'

import { Result } from '../Search/Result'

import { curatedListProps } from '../../utils/types'

export const CuratedList = props => {
  const { tag, name } = props

  return (
    <div className="curated-list">
      <h4 className="list-name">{name}</h4>
      <div className="listings">
        {tag.sampledListings.map(l => {
          return (
            <Result key={l.id} listing={l} />
          )
        })}
      </div>
    </div>
  )
}

CuratedList.propTypes = curatedListProps

CuratedList.defaultProps = {
  description: '',
}

export default CuratedList
