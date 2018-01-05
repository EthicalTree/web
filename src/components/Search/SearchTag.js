import './SearchTag.sass'

import React from 'react'
import PropTypes from 'prop-types'
import IconLabel from '../Util/Icons/IconLabel'
import Icon from '../Util/Icons/Icon'

const SearchTag = props => {
  const { iconKey, name } = props

  return (
    <div tabIndex="0" className="search-tag">
      <IconLabel leftIcon={iconKey} text={name} />
      <span className="remove-icon"><Icon iconKey="cross" /></span>
    </div>
  )
}

SearchTag.propTypes = {
  id: PropTypes.number.isRequired,
  iconKey: PropTypes.string,
  type: PropTypes.oneOf(['ethicality']).isRequired,
  name: PropTypes.string.isRequired
}

SearchTag.defaultProps = {

}

export default SearchTag
