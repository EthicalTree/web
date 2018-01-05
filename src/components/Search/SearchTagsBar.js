import './SearchTagsBar.sass'

import React from 'react'
import PropTypes from 'prop-types'
import InputTag from '../Util/Tag/InputTag'

const SearchTagsBar = props => {
  const { tags, handleTagRemove, className } = props

  return (
    <div className={`search-tags-bar ${className}`}>
      {tags.map(tag => {
        const { name } = tag

        return (
          <InputTag
            key={name}
            name={name}
            handleRemove={handleTagRemove}
          />
        )
      })}
    </div>
  )
}

SearchTagsBar.propTypes = {
  tags: PropTypes.array,
  handleTagRemove: PropTypes.func.isRequired
}

SearchTagsBar.defaultProps = {
  tags: []
}

export default SearchTagsBar
