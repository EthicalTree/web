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
  return (
    <InputGroup>
      <input {...props} />
      <InputGroupButton>
        <Button color="danger" onClick={props.onClick}>
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
              onClick: this.search.bind(this),
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

