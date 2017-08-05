import React from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'

import {
  InputGroup,
  InputGroupButton,
  Button
} from 'reactstrap'

const Suggestion = (props) => {
  return (
    <div></div>
  )
}

const SearchInput = (props) => {
  let inputProps = {...props}
  delete inputProps.onSearch

  return (
    <InputGroup>
      <input {...inputProps} />
      <InputGroupButton>
        <Button color="danger" onClick={props.onSearch}>
          Search
        </Button>
      </InputGroupButton>
    </InputGroup>
  )
}


class Search extends React.Component {

  onChange(e, {newValue}) {
    const { dispatch } = this.props

    dispatch({ type: 'SET_SEARCH_QUERY', data: newValue })
  }

  search(e) {
    const { history, search } = this.props

    if ((e.key && e.key === 'Enter') || !e.key) {
      history.push(`/s/${search.query}`)
    }
  }

  onSuggestionsFetchRequested() {

  }

  onSuggestionsClearRequested() {

  }

  render() {
    const { search } = this.props

    return (
      <div className="et-search">
          <Autosuggest
            suggestions={[]}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
            getSuggestionValue={suggestion => suggestion.name}
            renderSuggestion={Suggestion}
            renderInputComponent={SearchInput}
            inputProps={{
              className: "form-control",
              placeholder: 'What are you looking for?',
              onChange: this.onChange.bind(this),
              onSearch: this.search.bind(this),
              onKeyDown: this.search.bind(this),
              value: search.query
            }}
          />
      </div>
    )
  }
}

const select = (state) => {
  return {
    search: state.search
  }
}

export default connect(select)(Search)

