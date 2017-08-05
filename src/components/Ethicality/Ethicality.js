import './Ethicality.sass'

import React from 'react'
import icons from './EthicalityIcons'

const EthicalityBar = (props) => {
  const {
    ethicalities,
    selectedEthicalities,
    onEthicalitySelect,
    showLabels
  } = props

  return (
    <div className={props.className}>
      {ethicalities.map(ethicality => {
        return (
          <span key={ethicality.slug} className="p-2">
            <Ethicality
              className="p-3"
              name={ethicality.name}
              slug={ethicality.slug}
              icon_key={ethicality.icon_key}
              selected={!!selectedEthicalities.find(e => e === ethicality.slug)}
              onSelect={onEthicalitySelect}
              showLabel={showLabels}
            />
          </span>
        )
      })}
    </div>
  )
}

const Ethicality = (props) => {
  const {
    onSelect,
    slug,
    icon_key,
    name,
    className,
    selected,
    showLabel
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
      {showLabel !== false &&
        <div className="name mt-2">
          {name}
        </div>
      }
    </div>
  )
}

const EthicalityIcon = (props) => {
  const Icon = icons[props.ethicalityKey]
  return <Icon className={`ethicality-icon ${props.className}`} />
}

export {
  Ethicality,
  EthicalityBar,
  EthicalityIcon
}
