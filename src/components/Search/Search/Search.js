import './Search.css'

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
import { IconInput } from '../../Icon'

import { getCategories, getLocations } from '../../../actions/search'
import { getSavedSearchLocation } from '../../../utils/address'

const LocationSuggestion = (suggestion, {query, isHighlighted}) => {
  return (
    <span>{suggestion}</span>
  )
}

const CategorySuggestion = props => {

}

const LocationInput = props => {
  const { onClick, isLocationFocused, value, ...inputProps } = props
  let newValue = value

  if (!newValue && !isLocationFocused) {
    newValue = getSavedSearchLocation()
  }

  return (
    <IconInput
      className="location-input"
      leftIcon="road_sign"
      rightIcon="chevron_down"
      onClick={onClick}
      inputProps={{...inputProps, value: newValue}}
    />
  )
}

class Search extends React.Component {

  onLocationSearch = e => {
    e.preventDefault()
    console.log(e.target.value)
  }

  constructor(props) {
    super(props)

    this.state = {
      query: '',
      dirty: false,
      isLocationFocused: false
    }
  }

  onLocationClick(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch({ type: 'SET_SEARCH_LOCATION', data: '' })
    dispatch(getLocations(''))
    this.locationInput.focus()
  }

  onLocationSelected(thing) {
    this.categoryInput.focus()
  }

  shouldRenderLocationSelections(thing) {
    return true
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
      location: search.location || getSavedSearchLocation(),
      page: 1
    }

    if ((e.key && e.key === 'Enter') || !e.key) {
      dispatch({ type: 'SET_SEARCH_QUERY', data: query })
      history.push(`/s/${encodeURIComponent(query)}?${querystring.stringify(paramsObj)}`)
    }
  }

  render() {
    const { search, dispatch } = this.props

    const { isLocationFocused } = this.state
    let { query, dirty } = this.state

    if (!dirty && search.query) {
      query = search.query
    }

    return (
      <Col>
        <Row noGutters className="et-search">
          <Col xs="12" md="5" lg="4" className="mb-2">
            <Autosuggest
              suggestions={search.locationSuggestions}
              onSuggestionsFetchRequested={({ value }) => dispatch(getLocations(value))}
              onSuggestionsClearRequested={() => dispatch({ type: 'CLEAR_SEARCH_LOCATIONS' })}
              getSuggestionValue={suggestion => suggestion}
              onSuggestionSelected={this.onLocationSelected.bind(this)}
              renderSuggestion={LocationSuggestion}
              renderInputComponent={LocationInput}
              shouldRenderSuggestions={this.shouldRenderLocationSelections.bind(this)}
              focusInputOnSuggestionClick={false}
              inputProps={{
                onClick: this.onLocationClick.bind(this),
                isLocationFocused: isLocationFocused,
                innerRef: locationInput => { this.locationInput = locationInput },
                location: search.location,
                value: search.location,
                placeholder: 'Where?',
                onFocus: () => { this.setState({ isLocationFocused: true }) },
                onBlur: () => { this.setState({ isLocationFocused: false }) },
                onChange: (e, value) => {
                  dispatch({ type: 'SET_SEARCH_LOCATION', data: value.newValue })
                }
              }}
            />
          </Col>

          <Col xs="12" md="5" lg="6" className="mb-2">
            <Autosuggest
              suggestions={search.categorySuggestions}
              onSuggestionsFetchRequested={() => dispatch(getCategories())}
              onSuggestionsClearRequested={() => dispatch({ type: 'CLEAR_SEARCH_CATEGORIES' })}
              getSuggestionValue={suggestion => suggestion}
              renderSuggestion={CategorySuggestion}
              renderInputComponent={props => (<IconInput leftIcon="search" inputProps={props} />)}
              inputProps={{
                innerRef: categoryInput => { this.categoryInput = categoryInput },
                className: "category-input",
                placeholder: 'What are you looking for?',
                onChange: this.onChange.bind(this),
                onKeyDown: this.search.bind(this),
                value: query
              }}
            />
          </Col>

          <Col xs="12" md="2" lg="2" className="mb-2">
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
    session: state.session
  }
}

export default withRouter(connect(select)(Search))
