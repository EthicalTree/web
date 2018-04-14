import './TagBar.css'

import React from 'react'
import PropTypes from 'prop-types'
import { keyPressed } from '../../../utils/a11y'
import { Icon } from '../../Icon'

import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'

import { autoPreventDefault } from '../../../utils/a11y'

export const Tag = props => {
  const { tag, handleTagRemove } = props

  return (
    <span className="tag">
      {`#${tag}`}
      <Icon
        iconKey="cross"
        clickable
        onClick={handleTagRemove}
      ></Icon>
    </span>
  )
}

const TagBarToggle = props => {
  const { isOpen, handleToggle } = props

  return (
    <a
      className="tagbar-toggle"
      href=""
      onClick={handleToggle}
    >
      {isOpen && 'Close Tag Bar'}
      {!isOpen && 'Open Tag Bar'}
    </a>
  )
}

export class TagBar extends React.Component {

  handleTagAdd = () => {
    const { onTagAdd } = this.props
    const { currentTag } = this.state
    onTagAdd(currentTag)
    this.setState({ currentTag: '' })
  }

  handleTagRemove = id => {
    const { onTagRemove } = this.props

    return event => {
      event.preventDefault()
      onTagRemove(id)
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      currentTag: '',
      isOpen: false
    }
  }

  render() {
    const { tags } = this.props
    const { currentTag, isOpen } = this.state

    const tagBarToggle = (
      <TagBarToggle
        isOpen={isOpen}
        handleToggle={autoPreventDefault(() => this.setState({ isOpen: !isOpen }))}
      />
    )

    if (!isOpen) {
      return (
        <div className="tagbar-closed">
          {tagBarToggle}
        </div>
      )
    }

    return (
      <div className="tagbar">
        {tagBarToggle}

        <div className="tags">
          {tags.map(tag => {
            return (
              <Tag
                key={tag.id}
                id={tag.id}
                tag={tag.hashtag}
                handleTagRemove={this.handleTagRemove(tag.id)}
              />
            )
          })}
        </div>

        <div className="tag-input">
          <InputGroup>
            <Input
              onKeyPress={keyPressed('Enter', this.handleTagAdd)}
              onChange={e => this.setState({ currentTag: e.target.value })}
              name="addTag"
              id="addTag"
              placeholder="#hipandcoolplaces"
              value={currentTag}
            />

            <InputGroupAddon addonType="append">
              <Button color="default" onClick={this.handleTagAdd}>
                Add
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    )
  }

}

TagBar.propTypes = {
  onTagAdd: PropTypes.func.isRequired,
  onTagRemove: PropTypes.func.isRequired,
  tags: PropTypes.array
}

TagBar.defaultProps = {
  tags: []
}

export default TagBar
