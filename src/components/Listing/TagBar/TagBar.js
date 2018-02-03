import './TagBar.css'

import React from 'react'
import PropTypes from 'prop-types'
import { keyPressed } from '../../../utils/a11y'
import { Icon } from '../../Util/Icons'

import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'

import { tagProp } from '../../../utils/types'

export const Tag = props => {
  const { tag, handleTagRemove } = props

  return (
    <span className="tag">
      {`#${tag}`}
      <a href="" onClick={handleTagRemove}>
        <Icon iconKey="cross"></Icon>
      </a>
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
    )
  }

}

TagBar.propTypes = {
  onTagAdd: PropTypes.func.isRequired,
  onTagRemove: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(tagProp)
}

TagBar.defaultProps = {
  tags: []
}

export default TagBar
