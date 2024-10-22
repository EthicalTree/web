import './Search.css'

import React from 'react'
import Autosuggest from 'react-autosuggest'
import querystring from 'querystring'
import union from 'lodash/union'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Button, Col, Row } from 'reactstrap'

import { IconInput } from '../../Icon'
import { LocationSuggestion } from '../LocationSuggestion'
import { LocationInput } from '../LocationInput'

import { parseEthicalitiesFromString } from '../../../models/ethicalities'
import { setSearchLocation, setSearchUrl } from '../../../actions/search'

import { api } from '../../../utils/api'
import {
  setGeoLocation,
  DEFAULT_LOCATION,
  NEAR_ME_LOCATION,
} from '../../../utils/location'

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
    const { app, dispatch, search } = this.props
    const { query } = this.state

    const { result, ethicalities } = parseEthicalitiesFromString(
      query,
      app.ethicalities
    )

    if ((event.key && event.key === 'Enter') || !event.key) {
      dispatch(
        setSearchUrl(search, {
          query: result,
          swlat: '',
          swlng: '',
          nelat: '',
          nelng: '',
          page: 1,
          ethicalities: union(
            search.selectedEthicalities,
            ethicalities.map(e => e.slug)
          ),
        })
      )

      if (result !== query) {
        this.setState({ query: result })
      }
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

  componentWillReceiveProps = nextProps => {
    const { location } = this.state
    const { search } = nextProps
    const newLocation = search.location || DEFAULT_LOCATION

    if (newLocation.name !== location) {
      this.setState({ location: newLocation.name, nearMe: newLocation.nearMe })
    }
  }

  constructor(props) {
    super(props)

    const { search } = props
    const location = search.location || DEFAULT_LOCATION

    this.state = {
      dirty: false,
      location: location.name,
      locationSuggestions: [],
      nearMe: location.nearMe,
      query: search.query || '',
    }

    this.locationCache = {}
  }

  focusLocation = () => {
    this.setState({ location: '' })
    this.locationInput.focus()
    this.fetchLocations({ query: '' })
  }

  handleLocationChange = location => {
    this.setState({
      location,
      nearMe: location === 'Near Me',
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
    const { location, locationSuggestions } = this.state

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

const select = state => {
  return {
    app: state.app,
    search: state.search,
    session: state.session,
  }
}

export default withRouter(connect(select)(Search))
