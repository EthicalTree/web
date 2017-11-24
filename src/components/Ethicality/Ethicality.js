import './Ethicality.sass'
import uuid4 from 'uuid'

import React from 'react'
import icons from '../Util/Icons/AppIcons'

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
    <div className={`${props.className} d-flex justify-content-around`}>
      {ethicalities.map(ethicality => {
        return (
          <span key={ethicality.slug} className="p-2">
            <Ethicality
              name={ethicality.name}
              slug={ethicality.slug}
              iconKey={ethicality.iconKey}
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
    iconKey,
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
  const slugClass = slug ? slug : ''
  const newClassName = className ? className : ''

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
      className={`ethicality-toggle text-center ${slugClass} ${selectClass} ${selectedClass} ${newClassName}`}
    >
      <EthicalityIcon
        ethicalityKey={iconKey}
        name={name}
        uuid={uuid}
      />
      {showLabel !== false &&
        <div className="name mt-2">
          {name}
        </div>
      }
    </div>
  )
}

const EthicalityIcon = (props) => {
  const { name, uuid, className } = props
  const Icon = icons[props.ethicalityKey]
  const id = !!uuid ? `id-${uuid}` : undefined
  const newClassName = className ? className : ''

  return (
    <div id={id} className="ethicality-icon">
      <Icon className={`${newClassName}`} />
      {uuid &&
        <Tooltip placement="top" target={id} delay={0}>{name}</Tooltip>
      }
    </div>
  )
}

export {
  Ethicality,
  EthicalityBar,
  EthicalityIcon
}
