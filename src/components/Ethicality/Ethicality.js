import './Ethicality.sass'
import uuid4 from 'uuid'

import React from 'react'
import icons from './EthicalityIcons'

import {
  UncontrolledTooltip as Tooltip
} from 'reactstrap'

const EthicalityBar = (props) => {
  const {
    ethicalities,
    selectedEthicalities,
    onEthicalitySelect,
    showLabels,
    showTooltips
  } = props

  return (
    <div className={`${props.className} d-flex justify-content-between`}>
      {ethicalities.map(ethicality => {
        return (
          <span key={ethicality.slug} className="p-2">
            <Ethicality
              name={ethicality.name}
              slug={ethicality.slug}
              icon_key={ethicality.icon_key}
              selected={!!selectedEthicalities.find(e => e === ethicality.slug)}
              onSelect={onEthicalitySelect}
              showLabel={showLabels}
              showTooltip={showTooltips}
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
    showLabel,
    showTooltip
  } = props

  const selectable = !!onSelect
  const selectClass = selectable ? 'selectable' : ''
  const selectedClass = selected ? 'selected' : ''
  const uuid = showTooltip ? uuid4() : ''

  const clickWrapper = (e) => {
    e.preventDefault()

    if (onSelect) {
      onSelect(slug)
    }
  }

  return (
    <div
      id={uuid}
      onClick={clickWrapper}
      className={`ethicality-toggle text-center ${slug} ${selectClass} ${selectedClass} ${className}`}>
      <div>
        <EthicalityIcon
          ethicalityKey={icon_key}
          name={name}
          uuid={uuid}
        />
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
  const { name, uuid } = props

  return (
    <div className="d-inline ethicality-icon">
      <Icon className={`${props.className}`} />
      {uuid &&
        <Tooltip placement="top" target={uuid} delay={0}>{name}</Tooltip>
      }
    </div>
  )
}

export {
  Ethicality,
  EthicalityBar,
  EthicalityIcon
}
