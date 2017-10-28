import React from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import { withRouter } from 'react-router-dom'

import {
  InputGroup,
  InputGroupButton,
  Button
} from 'reactstrap'

import querystring from 'querystring'

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

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      dirty: false
    }
  }

  onChange(e, {newValue}) {
    this.setState({
      dirty: true,
      query: newValue
    })
  }

  search(e) {
    const { search, history, dispatch } = this.props
    const { query } = this.state

    const paramsObj = {
      ethicalities: search.selectedEthicalities.join(','),
      page: search.currentPage
    }

    if ((e.key && e.key === 'Enter') || !e.key) {
      dispatch({ type: 'SET_SEARCH_QUERY', data: query })
      history.push(`/s/${query}?${querystring.stringify(paramsObj)}`)
    }
  }

  onSuggestionsFetchRequested() {

  }

  onSuggestionsClearRequested() {

  }

  render() {
    const { search } = this.props
    let { query, dirty } = this.state

    if (!dirty && search.query) {
      query = search.query
    }

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
              value: query
            }}
          />
      </div>
    )
  }
}

const select = (state) => {
  return {
    search: state.search,
    router: state.router
  }
}

export default withRouter(connect(select)(Search))

