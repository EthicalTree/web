import './Search.css'

import React from 'react'
import Autosuggest from 'react-autosuggest'
import querystring from 'querystring'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Button, Col, Row } from 'reactstrap'

import { IconInput } from '../../Icon'
import { LocationSuggestion } from '../LocationSuggestion'
import { LocationInput } from '../LocationInput'

import { api } from '../../../utils/api'
import { setSearchLocation } from '../../../actions/search'
import { setGeoLocation, DEFAULT_LOCATION, NEAR_ME_LOCATION } from '../../../utils/location'

class Search extends React.Component {

  fetchLocations = queryObj => {
    const cached = this.locationCache[queryObj.query]

    if (cached) {
      this.setState({ locationSuggestions: cached })
      return
    }

    return api
      .get(`/v1/locations?${querystring.stringify(queryObj)}`)
      .then(results => {
        const locationSuggestions = [NEAR_ME_LOCATION].concat(results.data)

        this.locationCache[queryObj.query] = locationSuggestions
        this.setState({ locationSuggestions })
      })
  }

  search = event => {
    const { search, history, dispatch } = this.props
    const { query } = this.state
    const { location } = search

    if ((event.key && event.key === 'Enter') || !event.key) {
      const paramsObj = {
        ethicalities: search.selectedEthicalities.join(','),
        location: location ? location.name : '',
        page: 1,
      }

      dispatch({
        type: 'SET_SEARCH_QUERY_PARAMS',
        data: {
          query,
          swlat: '',
          swlng: '',
          nelat: '',
          nelng: '',
        },
      })

      history.push(
        `/s/${encodeURIComponent(query)}?${querystring.stringify(paramsObj)}`
      )
      dispatch({ type: 'SET_SEARCH_PENDING', data: true })
    }
  }

  finalizeSearchLocation = () => {
    const { dispatch } = this.props
    const { location, nearMe } = this.state

    if (nearMe) {
      setGeoLocation()
    }

    dispatch(setSearchLocation({ location, nearMe }))
    this.categoryInput.focus()
  }

  constructor(props) {
    super(props)

    const { search } = props
    const location = search.location || DEFAULT_LOCATION

    this.state = {
      dirty: false,
      isLocationFocused: false,
      location: location.name,
      locationSuggestions: [],
      nearMe: location.nearMe,
      query: search.query || '',
    }

    this.locationCache = {}
  }

  focusLocation = e => {
    this.setState({ location: '' })
    this.locationInput.focus()
    this.fetchLocations({ query: '' })
  }

  handleLocationChange = location => {
    this.setState({
      location,
      nearMe: location === 'Near Me'
    })
  }

  handleQueryChange = (e, { newValue }) => {
    this.setState({
      dirty: true,
      query: newValue,
    })
  }

  render() {
    const { search } = this.props

    const {
      isLocationFocused,
      location,
      locationSuggestions,
    } = this.state

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
              suggestions={locationSuggestions}
              onSuggestionsFetchRequested={({ value, reason }) => {
                if (reason !== 'input-focused') {
                  this.fetchLocations({ query: value })
                }
              }}
              onSuggestionsClearRequested={() => {}}
              getSuggestionValue={suggestion => suggestion.name}
              onSuggestionSelected={this.finalizeSearchLocation}
              onSuggestionHighlighted={({ suggestion }) => {
                if (suggestion) {
                  this.handleLocationChange(suggestion.name)
                }
              }}
              shouldRenderSuggestions={() => true}
              renderSuggestion={LocationSuggestion}
              renderInputComponent={LocationInput}
              focusInputOnSuggestionClick={false}
              inputProps={{
                onMouseDown: this.focusLocation,
                onFocus: this.focusLocation,
                isLocationFocused: isLocationFocused,
                innerRef: locationInput => {
                  this.locationInput = locationInput
                },
                value: location || '',
                placeholder: 'address, city, postal code...',
                onBlur: () => {
                  this.finalizeSearchLocation()
                },
                onChange: (e, { newValue }) => {
                  this.handleLocationChange(newValue)
                },
              }}
            />
          </Col>

          <Col xs="12" md="5" lg="6">
            <Autosuggest
              key="query"
              suggestions={[]}
              onSuggestionsFetchRequested={() => {}}
              onSuggestionsClearRequested={() => {}}
              getSuggestionValue={suggestion => suggestion}
              renderSuggestion={() => {}}
              renderInputComponent={props => (
                <IconInput leftIcon="search" inputProps={props} />
              )}
              inputProps={{
                innerRef: categoryInput => {
                  this.categoryInput = categoryInput
                },
                className: 'category-input',
                placeholder: 'eg. burgers, health store, clothing, brunch...',
                onChange: this.handleQueryChange,
                onKeyDown: this.search,
                value: query,
              }}
            />
          </Col>

          <Col xs="12" md="2" lg="2">
            <Button
              color="danger"
              className="full-height search-button"
              block
              onClick={this.search}>
              Search
            </Button>
          </Col>
        </Row>
      </Col>
    )
  }
}

const select = state => {
  return {
    search: state.search,
    session: state.session,
  }
}

export default withRouter(connect(select)(Search))
