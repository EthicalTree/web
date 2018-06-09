import './SearchResultsPage.css'

import React from 'react'
import querystring from 'querystring'
import { connect } from 'react-redux'
import { OverlayView } from 'react-google-maps'
import { Row, Col } from 'reactstrap'
import { Helmet } from 'react-helmet'

import { SearchResults } from '../../components/Search/SearchResults'
import { ResultsMap } from '../../components/Search/ResultsMap'
import { Result } from '../../components/Search/Result'
import { MapSwitcher } from '../../components/Search/MapSwitcher'

import { Loader } from '../../components/Loader'
import { CustomOverlayView } from '../../components/Maps/CustomOverlayView'

import { performSearch } from '../../actions/search'

class SearchResultsPage extends React.Component {

  performSearch = (newPage=0, ethicalities, location) => {
    const { dispatch, history, search } = this.props

    const query = search.query
    const selectedEthicalities = ethicalities ? ethicalities : search.selectedEthicalities
    const searchLocation = location ? location : search.location

    const paramsObj = { ethicalities: selectedEthicalities.join(','), location: searchLocation }


    dispatch({ type: 'SET_SEARCH_QUERY', data: query })
    dispatch({ type: 'SET_SEARCH_PAGE', data: newPage })
    dispatch({ type: 'SET_SEARCH_LOCATION', data: searchLocation })
    dispatch({ type: 'SET_SEARCH_ETHICALITIES', data: selectedEthicalities})
    dispatch({ type: 'SET_SEARCH_PENDING', data: true })
    history.push(`/s/${query}?${querystring.stringify(paramsObj)}`)
  }

  getQueryParams() {
    const { location } = this.props
    let search = querystring.parse(location.search.slice(1))

    search.page = search.page || 0
    search.ethicalities = search.ethicalities ? search.ethicalities.split(',') : []

    return search
  }

  componentWillMount() {
    const { match, dispatch } = this.props
    const queryParams = this.getQueryParams()

    dispatch({ type: 'SET_SEARCH_QUERY', data: match.params.query })
    dispatch({ type: 'SET_SEARCH_PAGE', data: queryParams.page })
    dispatch({ type: 'SET_SEARCH_LOCATION', data: queryParams.location })
    dispatch({ type: 'SET_SEARCH_ETHICALITIES', data: queryParams.ethicalities})
    dispatch({ type: 'SET_SEARCH_PENDING', data: true })
  }

  componentDidUpdate() {
    const { dispatch, search } = this.props

    if (search.isPending) {
      dispatch(performSearch(search.query, search.selectedEthicalities, search.location, search.currentPage))
      dispatch({ type: 'SET_SEARCH_PENDING', data: false })
    }
  }


  getOverlay() {
    const { selectedResult, listings, featured } = this.props.search

    if (selectedResult) {
      let listing = listings.find(r => r.slug === selectedResult)

      if (!listing) {
        listing = featured.find(r => r.slug === selectedResult)
      }

      if (!listing) {
        return null
      }

      const location = listing.locations[0]

      return (
        <CustomOverlayView
          position={location}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={(width, height) => {
            return {
              x: -(width / 2),
              y: -(height + 45)}
          }}
        >
          <Result
            className="result-overlay"
            key={listing.slug}
            listing={listing}
            location="Search Results Map"
            smallView={true}
          />
        </CustomOverlayView>
      )
    }

    return null
  }

  renderResults() {
    const {
      app,
      dispatch,
      history,
      location,
      search,
      selectedResult
    } = this.props

    if (!search.located) {
      return (
        <div className="location-not-found">
          <h4>Oh No!</h4>
          {`The location "${search.location}" could not be found. If you haven't already, try including the city and country as well!`}
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
          handlePageChange={this.performSearch}
          handleSearch={this.performSearch}
        />
        <ResultsMap
          key={`${search.resultMode}_${location.pathname}_${location.search}`}
          selectedResult={selectedResult}
          handleMarkerClick={slug => {
            const newSlug = !!search.selectedResult && search.selectedResult === slug ? null : slug
            dispatch({ type: 'SET_SELECTED_SEARCH_RESULT', data: newSlug })
            dispatch({ type: 'SET_SEARCH_RESULT_HOVER', data: newSlug })
          }}
          handleMarkerMouseOver={slug => dispatch({ type: 'SET_SEARCH_RESULT_HOVER', data: slug })}
          handleMarkerMouseOut={slug => dispatch({ type: 'SET_SEARCH_RESULT_HOVER', data: search.selectedResult })}
          handleMapClick={() => {
            setTimeout(() => {
              dispatch({ type: 'SET_SELECTED_SEARCH_RESULT', data: null })
            }, 0)
          }}
          search={search}
          overlay={this.getOverlay()}
        />
      </React.Fragment>
    )
  }

  render() {
    const {
      search,
      user
    } = this.props

    const title = search.query ? (
      `Search for "${search.query}" in ${user.city} · EthicalTree`
    ) : (
      `Search in ${user.city} · EthicalTree`
    )

    return (
      <Loader
        fixed={true}
        loading={search.isSearchLoading}
      >
        <Helmet>
          <title>{title}</title>
          <meta
            name="description"
            content={`Search for "${search.query}". Best of ${user.city}'s restaurants, bakeries, cafés and stores. Organic, Woman-Owned, Fair Trade, Vegan, Vegetarian.`}
          />
        </Helmet>

        <Col className="search-results-page">
          <Row>
            {this.renderResults()}
          </Row>
        </Col>
        <MapSwitcher mode={search.resultMode} />
      </Loader>
    )
  }
}

const SearchResultsWrapper = props => {
  const { pathname, search } = props.router.location
  return <SearchResultsPage key={`${pathname}${search}`} {...props} />
}

const select = (state) => {
  return {
    app: state.app,
    router: state.router,
    search: state.search,
    user: state.user
  }
}

export default connect(select)(SearchResultsWrapper)
