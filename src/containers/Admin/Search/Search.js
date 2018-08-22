import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap'

import { a11yClick } from '../../../utils/a11y'

export class Search extends React.Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus()
      this.input.setSelectionRange(0, this.input.value.length)
    }
  }

  render() {
    const { dispatch, admin, handleSearch } = this.props

    const onSearch = event => {
      event.preventDefault()
      handleSearch()
    }

    return (
      <InputGroup className="admin-search">
        <Input
          innerRef={input => (this.input = input)}
          type="text"
          value={admin.query || ''}
          placeholder="Search"
          onChange={e =>
            dispatch({ type: 'SET_ADMIN_SEARCH_QUERY', data: e.target.value })
          }
          onKeyPress={a11yClick(onSearch)}
        />

        <InputGroupAddon addonType="append">
          <Button onClick={onSearch}>Search</Button>
        </InputGroupAddon>
      </InputGroup>
    )
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
}

const select = state => ({
  admin: state.admin,
})

export default connect(select)(Search)
