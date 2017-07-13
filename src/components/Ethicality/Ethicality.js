import './Ethicality.sass'

import React from 'react'
import icons from './EthicalityIcons'

const Ethicality = (props) => {
  const {
    onSelect,
    slug,
    icon_key,
    name,
    className,
    selected
  } = props

  const selectable = !!onSelect
  const selectClass = selectable ? 'selectable' : ''
  const selectedClass = selected ? 'selected' : ''

  const clickWrapper = (e) => {
    e.preventDefault()

    if (onSelect) {
      onSelect(slug)
    }
  }

  const EthicalityIcon = icons[icon_key]

  return (
    <div
      onClick={clickWrapper}
      className={`ethicality-icon text-center ${slug} ${selectClass} ${selectedClass} ${className}`}>
      <div>
        <EthicalityIcon />
      </div>
      <div className="name mt-2">
        {name}
      </div>
    </div>
  )
}

export default Ethicality
