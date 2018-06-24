import './Search.css'

import React from 'react'
import Autosuggest from 'react-autosuggest'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  Button,
  Col,
  Row
} from 'reactstrap'

import querystring from 'querystring'
import { IconInput } from '../../Icon'

import { getLocations, setSearchLocation } from '../../../actions/search'
import { getSavedSearchLocation } from '../../../utils/address'

const LocationSuggestion = (suggestion, {query, isHighlighted}) => {
  return (
    <span>{suggestion.name}</span>
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

  search = event => {
    const { search, history, dispatch } = this.props
    const { query } = this.state
    let location = search.location

    if ((event.key && event.key === 'Enter') || !event.key) {
      if (location && location !== this.state.location) {
        location = this.state.location
        dispatch(setSearchLocation(this.state.location, this.state.city))
      }

      const paramsObj = {
        ethicalities: search.selectedEthicalities.join(','),
        location: location || getSavedSearchLocation(),
        page: 1
      }

      dispatch({ type: 'SET_SEARCH_QUERY_PARAMS', data: {query}})
      history.push(`/s/${encodeURIComponent(query)}?${querystring.stringify(paramsObj)}`)
      dispatch({ type: 'SET_SEARCH_PENDING', data: true })
    }
  }

  constructor(props) {
    super(props)

    const { dispatch, search } = props

    this.state = {
      query: search.query || '',
      dirty: false,
      city: undefined,
      location: '',
      isLocationFocused: false
    }

    this.fetchSuggestions = debounce(({ value }) => {
      if (this.isLocationFocused()) {
        dispatch(getLocations(value))
      }
    }, 100)
  }

  isLocationFocused() {
    return this.state.isLocationFocused
  }

  onLocationClick(e) {
    e.preventDefault()
    const { dispatch } = this.props
    this.setState({ location: '' })
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

  render() {
    const { search, dispatch } = this.props

    const { isLocationFocused, location } = this.state
    let { query, dirty } = this.state

    if (!dirty && search.query) {
      query = search.query
    }

    return (
      <Col>
        <Row noGutters className="et-search">
          <Col xs="12" md="5" lg="4">
            <Autosuggest
              key="suggest"
              suggestions={search.locationSuggestions}
              onSuggestionsFetchRequested={this.fetchSuggestions}
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
                location: location,
                value: location,
                placeholder: 'address, city, postal code...',
                onFocus: () => { this.setState({ isLocationFocused: true }) },
                onBlur: () => {
                  setTimeout(() => {
                    this.setState({ isLocationFocused: false })
                    if (search.location !== this.state.location) {
                      dispatch(setSearchLocation(this.state.location, this.state.city))
                    }
                  }, 0)
                },
                onChange: (e, value) => {
                  const { city, name } = value.newValue

                  this.setState({
                    location: name || value.newValue,
                    city
                  })
                }
              }}
            />
          </Col>

          <Col xs="12" md="5" lg="6">
            <Autosuggest
              key="query"
              suggestions={search.categorySuggestions}
              onSuggestionsFetchRequested={() => {}}
              onSuggestionsClearRequested={() => {}}
              getSuggestionValue={suggestion => suggestion}
              renderSuggestion={CategorySuggestion}
              renderInputComponent={props => (<IconInput leftIcon="search" inputProps={props} />)}
              inputProps={{
                innerRef: categoryInput => { this.categoryInput = categoryInput },
                className: "category-input",
                placeholder: 'eg. burgers, health store, clothing, brunch...',
                onChange: this.onChange.bind(this),
                onKeyDown: this.search,
                value: query
              }}
            />
          </Col>

          <Col xs="12" md="2" lg="2">
            <Button
              color="danger"
              className="full-height search-button"
              block
              onClick={this.search}
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

