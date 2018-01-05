import './Search.sass'

import React from 'react'
import PropTypes from 'prop-types'
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
import IconLabel from '../Util/Icons/IconLabel'

import { getSearchSuggestions, getLocations } from '../../actions/search'

const LocationSuggestion = (suggestion, {query, isHighlighted}) => {
  return (
    <span>{suggestion}</span>
  )
}

const SearchSuggestion = (suggestion, {query, isHighlighted}) => {
  const { name, iconKey } = suggestion

  return (
    <IconLabel leftIcon={iconKey} text={name} />
  )
}

const SearchAutosuggestTitle = props => {
  const { title } = props
  return (
    <label>{title}</label>
  )
}

const LocationInput = props => {
  const { onClick, isLocationFocused, value, ...inputProps } = props
  let newValue = value

  if (!newValue && !isLocationFocused) {
    newValue = 'Near Me'
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

  constructor(props) {
    super(props)

    this.state = {
      query: '',
      dirty: false,
      isLocationFocused: false
    }
  }

  fetchLocationSuggestions({value, reason}) {
    const { dispatch } = this.props

    if (value && reason === 'input-focused') {
      return
    }

    dispatch(getLocations(value))
  }

  onLocationFocus() {
    const { dispatch } = this.props
    this.setState({ isLocationFocused: true })
    dispatch({ type: 'SET_SEARCH_LOCATION', data: '' })
    dispatch(getLocations(''))
  }

  onLocationSelected(thing) {
    this.tagInput.focus()
  }

  fetchSearchSuggestions({value, reason}) {
    const { dispatch, search } = this.props

    if (value && reason === 'input-focused') {
      return
    }

    dispatch(getSearchSuggestions(value, search.selectedTags))
  }

  onSearchFocus() {
    const { dispatch } = this.props
    this.setState({ query: '' })
    dispatch(getSearchSuggestions(''))
  }

  onSearchChange(e, {newValue}) {
    this.setState({
      dirty: true,
      query: newValue
    })
  }

  onSearchTagSelected(e, {suggestion}) {
    const { dispatch } = this.props
    dispatch({ type: 'ADD_TAG_TO_SEARCH', data: suggestion })
  }

  search(e) {
    const { search, history, dispatch } = this.props
    const { query } = this.state

    const paramsObj = {
      ethicalities: search.selectedEthicalities.join(','),
      location: search.location,
      page: 0
    }

    if ((e.key && e.key === 'Enter') || !e.key) {
      dispatch({ type: 'SET_SEARCH_QUERY', data: query })
      history.push(`/s/${query}?${querystring.stringify(paramsObj)}`)
    }
  }

  render() {
    const { search, dispatch, showTags } = this.props

    const { isLocationFocused } = this.state
    let { query, dirty } = this.state

    if (!dirty && search.query) {
      query = search.query
    }

    const tags = showTags && search.selectedTags.map(tag => ({
      name: tag.name
    }))

    return (
      <Col>
        <Row noGutters className={`et-search`}>
          <Col xs="12" md="4" lg="3" className="mb-2 location-input-container">
            <Autosuggest
              suggestions={search.locationSuggestions}
              onSuggestionsFetchRequested={this.fetchLocationSuggestions.bind(this)}
              onSuggestionsClearRequested={() => dispatch({ type: 'CLEAR_SEARCH_LOCATIONS' })}
              getSuggestionValue={suggestion => suggestion}
              onSuggestionSelected={this.onLocationSelected.bind(this)}
              renderSuggestion={LocationSuggestion}
              renderInputComponent={LocationInput}
              onSuggestionHighlighted={() => {}}
              shouldRenderSuggestions={() => true}
              focusInputOnSuggestionClick={false}
              inputProps={{
                onClick: () => this.locationInput.focus(),
                isLocationFocused: isLocationFocused,
                innerRef: locationInput => { this.locationInput = locationInput },
                location: search.location,
                value: search.location,
                placeholder: 'Where?',
                onFocus: this.onLocationFocus.bind(this),
                onBlur: () => { this.setState({ isLocationFocused: false }) },
                onChange: (e, value) => {
                  dispatch({ type: 'SET_SEARCH_LOCATION', data: value.newValue })
                }
              }}
            />
          </Col>

          <Col xs="12" md="5" lg="7" className="mb-2 tag-input-container">
            <Autosuggest
              suggestions={search.searchSuggestions}
              onSuggestionSelected={this.onSearchTagSelected.bind(this)}
              onSuggestionsFetchRequested={this.fetchSearchSuggestions.bind(this)}
              onSuggestionsClearRequested={() => dispatch({ type: 'CLEAR_SEARCH_CATEGORIES' })}
              getSectionSuggestions={section => section.suggestions}
              getSuggestionValue={suggestion => query}
              renderSuggestion={SearchSuggestion}
              focusInputOnSuggestionClick={false}
              multiSection={true}
              shouldRenderSuggestions={() => true}
              renderSectionTitle={SearchAutosuggestTitle}
              renderInputComponent={props => (
                <IconInput
                  className="tag-input"
                  leftIcon="search"
                  tags={tags}
                  handleTagRemove={name => {
                    dispatch({ type: 'REMOVE_TAG_FROM_SEARCH', data: name })
                    this.tagInput.focus()
                  }}
                  inputProps={props}
                />
              )}
              inputProps={{
                onClick: () => this.tagInput.focus(),
                innerRef: tagInput => { this.tagInput = tagInput },
                placeholder: 'Vegetarian, Fair Trade, etc.',
                onFocus: this.onSearchFocus.bind(this),
                onChange: this.onSearchChange.bind(this),
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
    session: state.session
  }
}

export default withRouter(connect(select)(Search))

