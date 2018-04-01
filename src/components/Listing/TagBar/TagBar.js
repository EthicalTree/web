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
      currentTag: ''
    }
  }

  render() {
    const { tags } = this.props
    const { currentTag } = this.state

    return (
      <div className="tagbar">
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
