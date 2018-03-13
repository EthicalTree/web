import './Ethicality.css'
import uuid4 from 'uuid'

import React from 'react'
import classnames from 'classnames'
import icons from '../Icon/AppIcons'

import {
  UncontrolledTooltip as Tooltip
} from 'reactstrap'

import { a11yClick } from '../../utils/a11y'

export const EthicalityBar = (props) => {
  const {
    ethicalities,
    selectedEthicalities,
    onEthicalitySelect,
    showLabels,
    showTooltips,
    showIcons
  } = props

  return (
    <div className={`${props.className} d-flex flex-wrap`}>
      {ethicalities.map(ethicality => {
        return (
          <span key={ethicality.slug} className="mt-1 mb-1">
            <Ethicality
              className="ethicality-small"
              name={ethicality.name}
              slug={ethicality.slug}
              iconKey={ethicality.iconKey}
              selected={!!selectedEthicalities.find(e => e === ethicality.slug)}
              onSelect={onEthicalitySelect}
              showLabel={showLabels}
              showIcon={showIcons}
              showTooltip={showTooltips}
            />
          </span>
        )
      })}
    </div>
  )
}

export const Ethicality = (props) => {
  const {
    onSelect,
    slug,
    iconKey,
    name,
    className,
    selected,
    showLabel,
    showTooltip,
    showIcon
  } = props

  const selectable = !!onSelect
  const uuid = showTooltip ? uuid4() : ''

  const classNames = classnames(
    'ethicality-toggle',
    'text-center',
    className,
    slug,
    { selectable },
    { selected },
  )

  const clickWrapper = (e) => {
    e.preventDefault()

    if (onSelect) {
      onSelect(slug)
    }
  }

  return (
    <div
      id={uuid}
      className={classNames}
      onClick={clickWrapper}
      onKeyPress={a11yClick(clickWrapper)}
      tabIndex={selectable ? '0' : '-1'}
    >
      {showIcon !== false &&
        <EthicalityIcon
          ethicalityKey={iconKey}
          name={name}
          uuid={uuid}
        />
      }
      {showLabel !== false &&
        <div className="name">
          {name}
        </div>
      }
    </div>
  )
}

export const EthicalityIcon = (props) => {
  const { name, uuid, className } = props
  const Icon = icons[props.ethicalityKey]
  const id = !!uuid ? `id-${uuid}` : undefined
  const newClassName = className ? className : ''

  return (
    <span id={id} className="ethicality-icon">
      <Icon className={`${newClassName}`} />
      {uuid &&
        <Tooltip placement="top" target={id} delay={0}>{name}</Tooltip>
      }
    </span>
  )
}

