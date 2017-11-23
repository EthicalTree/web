import './Search.sass'

import React from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import { withRouter } from 'react-router-dom'

import {
  Button,
  Col,
  Row
} from 'reactstrap'

import querystring from 'querystring'
import IconInput from '../Util/Icons/IconInput'

const Suggestion = (props) => {
  return (
    <div></div>
  )
}

const LocationInput = props => {
  return (
    <IconInput
      className="location-input"
      icon="road_sign"
      inputProps={{
        placeholder: 'Where?'
      }}
    />
  )
}

class Search extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      query: '',
      dirty: false
    }

    this.autocomplete = new window.google.maps.places.AutocompleteService()
  }

  onLocationSearch(e) {
    e.preventDefault()
    console.log(e.target.value)
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
      page: 0
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
      <Col>
        <Row noGutters className="et-search">
          <Col xs="12" md="4" lg="3" className="mb-2">
            <LocationInput />
          </Col>

          <Col xs="12" md="5" lg="7" className="mb-2">
            <Autosuggest
              suggestions={[]}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
              getSuggestionValue={suggestion => suggestion.name}
              renderSuggestion={Suggestion}
              renderInputComponent={props => (<IconInput icon="search" inputProps={props} />)}
              inputProps={{
                className: "form-control",
                placeholder: 'What are you looking for?',
                onChange: this.onChange.bind(this),
                onKeyDown: this.search.bind(this),
                value: query
              }}
            />
          </Col>

          <Col xs="12" md="3" lg="2" className="mb-2">
            <Button
              color="danger"
              className="full-height search-button"
              block
              onClick={this.search.bind(this)}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Col>
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

