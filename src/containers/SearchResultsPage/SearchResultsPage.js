import './SearchResultsPage.css'

import React from 'react'
import querystring from 'querystring'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Helmet } from 'react-helmet'

import { SearchResults } from '../../components/Search/SearchResults'
import { ResultsMap } from '../../components/Search/ResultsMap'
import { MapSwitcher } from '../../components/Search/MapSwitcher'

import { Loader } from '../../components/Loader'
import { ListingOverlay } from '../../components/Maps/CustomOverlayView'

import { performSearch } from '../../actions/search'

class SearchResultsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapHeight: this.getInnerHeight(),
      scrollTop: 0,
    }
  }

  getInnerHeight() {
    return window.innerHeight - 73
  }

  handleMapLoad = (map) => {
    if (map) {
      this.map = map
      this.updateMapPosition()
    }
  }

  updateMapPosition = () => {
    if (this.mapEl) {
      this.setState({
        mapHeight: this.getInnerHeight(),
        scrollTop: document.getElementsByTagName('html')[0].scrollTop,
      })
    }
  }

  performSearch = (params = {}) => {
    const { dispatch, history, search } = this.props
    const { bounds } = params

    const query = search.query
    const ethicalities = params.ethicalities || search.selectedEthicalities
    const openNow = search.openNow
    const location = params.location || search.location
    const page = params.page || search.currentPage

    let paramsObj = {
      ethicalities: ethicalities.join(','),
      location: location,
      open_now: openNow,
      page,
      swlat: '',
      swlng: '',
      nelat: '',
      nelng: '',
    }

    if (bounds) {
      const sw = bounds.getSouthWest()
      const ne = bounds.getNorthEast()

      paramsObj = {
        ...paramsObj,
        swlat: sw.lat(),
        swlng: sw.lng(),
        nelat: ne.lat(),
        nelng: ne.lng(),
      }
    }

    dispatch({ type: 'SET_SEARCH_QUERY_PARAMS', data: paramsObj })
    dispatch({ type: 'SET_SEARCH_PENDING', data: true })

    history.push(`/s/${query}?${querystring.stringify(paramsObj)}`)
  }

  handleRedoSearch = bounds => {
    this.performSearch({ bounds })
  }

  getQueryParams() {
    const { location } = this.props
    let search = querystring.parse(location.search.slice(1))

    search.page = search.page || 1
    search.ethicalities = search.ethicalities
      ? search.ethicalities.split(',')
      : []

    return search
  }

  componentDidMount() {
    const { match, dispatch } = this.props
    const queryParams = this.getQueryParams()

    window.addEventListener('scroll', this.updateMapPosition)
    window.addEventListener('resize', this.updateMapPosition)

    dispatch({
      type: 'SET_SEARCH_QUERY_PARAMS',
      data: {
        query: match.params.query,
        ...queryParams,
      },
    })

    dispatch({ type: 'SET_SEARCH_PENDING', data: true })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateMapPosition)
    window.removeEventListener('resize', this.updateMapPosition)
  }

  componentDidUpdate() {
    const { dispatch, search } = this.props

    if (search.isPending) {
      dispatch(
        performSearch({
          query: search.query,
          ethicalities: search.selectedEthicalities,
          open_now: search.openNow,
          location: search.location,
          page: search.currentPage,
          nelat: search.nelat,
          nelng: search.nelng,
          swlat: search.swlat,
          swlng: search.swlng,
        })
      )

      dispatch({ type: 'SET_SEARCH_PENDING', data: false })
    }
  }

  getOverlay() {
    const { session } = this.props
    const { selectedResult, listings, featured } = this.props.search

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
    const { app, dispatch, history, location, search, session } = this.props

    const { mapHeight, scrollTop } = this.state

    if (!search.located) {
      return (
        <div className="location-not-found">
          <h4>Oh No!</h4>
          {`The location "${
            search.location
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
          handleSearch={this.performSearch}
        />
        <ResultsMap
          mapEl={(el) => this.mapEl = el}
          key={`${search.resultMode}_${location.pathname}_${location.search}`}
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
          handleMarkerMouseOut={slug =>
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
          listings={search.listings}
          featured={search.featured}
          resultMode={search.resultMode}
          overlay={this.getOverlay()}
          mapHeight={mapHeight}
          scrollTop={scrollTop}
        />
      </React.Fragment>
    )
  }

  render() {
    const { dispatch, search, user } = this.props

    const title = search.query
      ? `Search for "${search.query}" in ${user.city} · EthicalTree`
      : `Search in ${user.city} · EthicalTree`

    return (
      <Loader fixed={true} loading={search.isSearchLoading}>
        <Helmet>
          <title>{title}</title>
          <meta
            name="description"
            content={`Search for "${search.query}". Best of ${
              user.city
            }'s restaurants, bakeries, cafés and stores. Organic, Woman-Owned, Fair Trade, Vegan, Vegetarian.`}
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
      </Loader>
    )
  }
}

const SearchResultsWrapper = props => {
  const { pathname, search } = props.router.location
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
