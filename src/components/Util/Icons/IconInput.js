import './IconInput.sass'

import React from 'react'
import PropTypes from 'prop-types'
import AppIcons from './AppIcons'
import InputTag from '../Tag/InputTag'

class IconInput extends React.Component {
  render() {
    const {
      leftIcon,
      rightIcon,
      className,
      onClick,
      tags,
      handleTagRemove
    } = this.props

    let { inputProps } = this.props
    const { innerRef } = inputProps
    delete inputProps['innerRef']

    const LeftIcon = AppIcons[leftIcon]
    const RightIcon = AppIcons[rightIcon]

    return (
      <div tabIndex="0" onClick={onClick} className={`icon-input form-control ${className}`}>
        {leftIcon && <LeftIcon className="first-icon" />}
        <span className="input-area">
          {tags.length > 0 &&
            <span className="tags">
              {tags.map(tag => (
                <InputTag
                  key={tag.name}
                  {...tag}
                  handleRemove={handleTagRemove}
                />
              ))}
            </span>
          }
          <input tabIndex="-1" {...inputProps} ref={innerRef} />
        </span>
        {rightIcon && <RightIcon className="last-icon" />}
      </div>
    )
  }
}

IconInput.propTypes = {
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  inputProps: PropTypes.object,
  className: PropTypes.string,
  tags: PropTypes.array,
  handleTagRemove: PropTypes.func
}

IconInput.defaultProps = {
  className: '',
  tags: []
}

export default IconInput
