import './UserDropdown.css'

import React from 'react'
import Autosuggest from 'react-autosuggest'
import querystring from 'querystring'
import { Input } from 'reactstrap'
import { api } from '../../../utils/api'

export class UserDropdown extends React.Component {
  fetchUsers = () => {
    const { query } = this.state

    const queryObj = {
      pageSize: 10,
      query
    }

    api.get(`/v1/admin/users?${querystring.stringify(queryObj)}`)
      .then(({ data }) => {
        const { users } = data
        this.setState({ users })
      })
  }

  constructor(props) {
    super(props)

    this.state = {
      query: '',
      users: []
    }
  }

  render() {
    const { onUserSelected } = this.props
    const { query, users } = this.state

    return (
      <div className="user-search-dropdown">
        <Autosuggest
          suggestions={users}
          onSuggestionsFetchRequested={this.fetchUsers}
          onSuggestionsClearRequested={() => {
            this.setState({ users: []})
          }}
          getSuggestionValue={suggestion => suggestion.displayNameWithEmail}
          onSuggestionSelected={(e, { suggestion }) => {
            onUserSelected(suggestion)
          }}
          renderSuggestion={u => u.displayNameWithEmail}
          renderInputComponent={props => <Input {...props} />}
          inputProps={{
            autoFocus: true,
            value: query,
            placeholder: 'Search for a user...',
            onChange: (e, { newValue }) => {
              this.setState({ query: newValue })
            }
          }}
        />
      </div>
    )
  }
}

export default UserDropdown
