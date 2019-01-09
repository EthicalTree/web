import './SearchResultsPage.css'

import React, { Fragment } from 'react'
import querystring from 'querystring'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Helmet } from 'react-helmet'
import history from '../../utils/history'

import { SearchResults } from '../../components/Search/SearchResults'
import { ResultsMap } from '../../components/Search/ResultsMap'
import { MapSwitcher } from '../../components/Search/MapSwitcher'

import { ListingOverlay } from '../../components/Maps/CustomOverlayView'

import { deserializeEthicalities } from '../../utils/ethicalities'
import { getSeoText } from '../../utils/seo'

import {
  setSearchUrl,
  performSearchApiCall,
  setSearchLocation,
} from '../../actions/search'

class SearchResultsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapHeight: 0,
      mapWidth: 0,
    }
  }

  getMapHeight() {
    return window.innerHeight - 73
  }

  getMapWidth() {
    return this.mapEl ? this.mapEl.parentNode.offsetWidth : 0
  }

  handleMapLoad = map => {
    if (map) {
      this.mapEl = map
      this.updateMapPosition()
    }
  }

  updateMapPosition = () => {
    if (this.mapEl) {
      this.setState({
        mapHeight: this.getMapHeight(),
        mapWidth: this.getMapWidth(),
      })
    }
  }

  changeBounds = (params = {}) => {
    const { dispatch, search } = this.props
    const { bounds } = params

    if (bounds) {
      const sw = bounds.getSouthWest()
      const ne = bounds.getNorthEast()

      dispatch(
        setSearchUrl(search, {
          swlat: sw.lat(),
          swlng: sw.lng(),
          nelat: ne.lat(),
          nelng: ne.lng(),
        })
      )
      dispatch({ type: 'SET_SEARCH_PENDING', data: true })
    }
  }

  handleRedoSearch = bounds => {
    this.changeBounds({ bounds })
  }

  getQueryParams(location) {
    let search = querystring.parse(location.search.slice(1))

    search.page = search.page || 1
    search.ethicalities = deserializeEthicalities(search.ethicalities)

    return search
  }

  setQueryParams(queryParams) {
    const { match, dispatch } = this.props

    dispatch({
      type: 'SET_SEARCH_QUERY_PARAMS',
      data: {
        query: match.params.query,
        ...queryParams,
      },
    })
  }

  componentDidMount() {
    const { dispatch, search, location } = this.props
    const queryParams = this.getQueryParams(location)

    window.addEventListener('resize', this.updateMapPosition)

    if (queryParams.location && queryParams.location !== search.location.name) {
      dispatch(setSearchLocation({ location: queryParams.location }))
    }

    dispatch({ type: 'SET_SEARCH_PENDING', data: true })

    // handle when there are new queryparams
    this.setQueryParams(queryParams)
    this.backListener = history.listen(location => {
      const newQueryParams = this.getQueryParams(location)
      this.setQueryParams(newQueryParams)
    })

    this.updateMapPosition()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMapPosition)
  }

  componentDidUpdate(prevProps) {
    const { dispatch, search } = this.props

    if (prevProps.search.location.name !== search.location.name) {
      dispatch(setSearchUrl(search, {}))
    }

    if (search.isPending) {
      dispatch(performSearchApiCall(search))
      dispatch({ type: 'SET_SEARCH_PENDING', data: false })
    }
  }

  getOverlay() {
    const { session, search } = this.props
    const { selectedResult, listings, featured } = search

    if (selectedResult) {
      let listing = listings.find(r => r.slug === selectedResult)

      if (!listing) {
        listing = featured.find(r => r.slug === selectedResult)
      }

      if (!listing) {
        return null
      }

      return <ListingOverlay listing={listing} session={session} />
    }

    return null
  }

  renderResults() {
    const { app, dispatch, history, search, session } = this.props

    const { mapHeight, mapWidth } = this.state

    const style = {
      height: mapHeight,
      width: mapWidth,
      left: window.innerWidth - mapWidth,
      right: 0,
      position: 'fixed',
    }

    if (!search.located && !search.isLoading) {
      return (
        <div className="location-not-found">
          <h4>Oh No!</h4>
          {`The location "${
            search.location.name
          }" could not be found. If you haven't already, try including the city and country as well!`}
        </div>
      )
    }

    return (
      <React.Fragment>
        <SearchResults
          app={app}
          dispatch={dispatch}
          history={history}
          search={search}
          session={session}
        />
        <ResultsMap
          mapEl={this.handleMapLoad}
          handleMarkerClick={slug => {
            const newSlug =
              !!search.selectedResult && search.selectedResult === slug
                ? null
                : slug
            dispatch({ type: 'SET_SELECTED_SEARCH_RESULT', data: newSlug })
            dispatch({ type: 'SET_SEARCH_RESULT_HOVER', data: newSlug })
          }}
          handleMarkerMouseOver={slug =>
            dispatch({ type: 'SET_SEARCH_RESULT_HOVER', data: slug })
          }
          handleMarkerMouseOut={() =>
            dispatch({
              type: 'SET_SEARCH_RESULT_HOVER',
              data: search.selectedResult,
            })
          }
          handleMapClick={() => {
            setTimeout(() => {
              dispatch({ type: 'SET_SELECTED_SEARCH_RESULT', data: null })
            }, 0)
          }}
          handleRedoSearch={this.handleRedoSearch}
          bounds={{
            nelat: search.nelat,
            nelng: search.nelng,
            swlat: search.swlat,
            swlng: search.swlng,
          }}
          locationName={search.location.name}
          listings={search.listings}
          featured={search.featured}
          resultMode={search.resultMode}
          overlay={this.getOverlay()}
          session={session}
          style={style}
          onUpdate={this.updateMapPosition}
        />
      </React.Fragment>
    )
  }

  render() {
    const { dispatch, search } = this.props

    const title = search.query
      ? `Search for "${search.query}" in ${search.location.city} · EthicalTree`
      : `Search in ${search.location.city} · EthicalTree`

    const description = search.query
      ? `Search for "${search.query}". Best of ${
          search.location.city
        }'s restaurants, bakeries, cafés and stores. Organic, Woman-Owned, Fair Trade, Vegan, Vegetarian.`
      : `Best of ${
          search.location.city
        }'s restaurants, bakeries, cafés and stores. Organic, Woman-Owned, Fair Trade, Vegan, Vegetarian.`

    return (
      <Fragment>
        <Helmet>
          <title>{getSeoText('title', title)}</title>
          <meta
            name="description"
            content={getSeoText('description', description)}
          />
        </Helmet>

        <Col className="search-results-page">
          <Row>{this.renderResults()}</Row>
        </Col>
        <MapSwitcher
          mode={search.resultMode}
          onClick={() => dispatch({ type: 'TOGGLE_SEARCH_RESULTS_MODE' })}
          showText="Show Search Results"
        />
      </Fragment>
    )
  }
}

const SearchResultsWrapper = props => {
  const { router } = props
  const { pathname, search } = router.location
  return <SearchResultsPage key={`${pathname}${search}`} {...props} />
}

const select = state => {
  return {
    app: state.app,
    router: state.router,
    search: state.search,
    session: state.session,
    user: state.user,
  }
}

export default connect(select)(SearchResultsWrapper)
