import './SearchResults.css'

import React from 'react'
import { connect } from 'react-redux'
import { Search } from '../Search'
import { ResultsMap } from '../ResultsMap'
import { Result } from '../Result'
import { MapSwitcher } from '../MapSwitcher'

import querystring from 'querystring'
import { OverlayView } from 'react-google-maps'

import {
  Row,
  Col,
} from 'reactstrap'

import { Loader } from '../../Loader'
import { EthicalityBar } from '../../Ethicality/Ethicality'
import { Paginator } from '../../Paginator'
import { CustomOverlayView } from '../../Maps/CustomOverlayView'

import { performSearch, toggleSearchEthicalities } from '../../../actions/search'

const SearchResults = (props) => {
  const { app, search, dispatch, history, handleSearch } = props

  const ethicalities = app.ethicalities
  const selectedEthicalities = search.selectedEthicalities

  const hasSearch = history.location.pathname !== '/'
  const hasListings = search.listings && search.listings.length > 0
  const mobileHidden = search.resultMode === 'map' ? 'd-none d-xl-block' : ''

  const onEthicalitySelect = slug => {
    const newSelectedEthicalities = toggleSearchEthicalities(selectedEthicalities, slug)

    dispatch({ type: 'SET_SEARCH_ETHICALITIES', data: newSelectedEthicalities })
    handleSearch(0, newSelectedEthicalities)
  }

  return (
    <Col xs="12" xl="8" className={`search-results p-4 ${mobileHidden}`}>
      {hasSearch &&
        <Col className="d-lg-none d-xl-none mb-3" >
          <Search />
        </Col>
      }
      <EthicalityBar
        className="search-results-ethicalities justify-content-center"
        showLabels={true}
        showTooltips={false}
        showIcons={true}
        ethicalities={ethicalities}
        onEthicalitySelect={onEthicalitySelect}
        selectedEthicalities={selectedEthicalities}
      />

      <Row className="mt-2 no-gutters">
        <Col xs="12" lg="9">
          <div className="search-listings">
            <h5 className="p-3">Search Results</h5>
            <div className="d-flex flex-wrap align-items-stretch">
              {hasListings &&
                search.listings.map(listing => (
                  <Col key={listing.slug} xs="12" sm="6" lg="4">
                    <Result
                      listing={listing}
                      hovered={listing.slug === search.hoveredResult}
                    />
                  </Col>
                ))
              }
              {!hasListings &&
                <Col className="text-center pt-5">
                  No listings found!
                </Col>
              }
            </div>
          </div>
        </Col>

        <Col xs="12" lg="3">
          <div className="featured-listings">
            <h5 className="featured-listings-header">Featured</h5>
            <div className="d-flex flex-wrap flex-direction-column">
              {search.featured.map(listing => (
                <Col key={listing.slug} xs="12" sm="6" lg="12">
                  <Result
                    listing={listing}
                    hovered={listing.slug === search.hoveredResult}
                  />
                </Col>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {hasListings &&
        <Row className="text-center">
          <Paginator
            pageCount={search.pageCount}
            currentPage={search.currentPage}
            onPageChange={data => props.handlePageChange(data.selected, search.selectedEthicalities)}
          />
        </Row>
      }

    </Col>
  )
}

class SearchResultsPage extends React.Component {

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
  }

  componentDidMount() {
    const queryParams = this.getQueryParams()

    this.performSearch(queryParams.page, queryParams.ethicalities, queryParams.location)
    const titleLocation = queryParams.location || 'Search'

    document.title = `EthicalTree · ${titleLocation}`
  }

  performSearch(newPage=0, ethicalities, location) {
    const { match, dispatch, search } = this.props
    const query = search.query ? search.query : match.params.query || ''
    const selectedEthicalities = ethicalities ? ethicalities : search.selectedEthicalities
    const searchLocation = location ? location : search.location

    dispatch(performSearch(query, selectedEthicalities, searchLocation, newPage))
  }

  search(newPage=0, ethicalities) {
    const { search, history, dispatch } = this.props

    const paramsObj = {
      ethicalities: ethicalities.join(','),
      location: search.location,
      page: newPage
    }

    dispatch({ type: 'SET_SEARCH_QUERY', data: search.query })
    history.push(`/s/${search.query}?${querystring.stringify(paramsObj)}`)
  }

  getOverlay() {
    const { selectedResult, listings } = this.props.search

    if (selectedResult) {
      const listing = listings.find(r => r.slug === selectedResult)
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
            smallView={true}
          />
        </CustomOverlayView>
      )
    }

    return null
  }

  render() {
    const {
      search,
      app,
      dispatch,
      history,
      selectedResult
    } = this.props

    return (
      <Loader loading={search.isSearchLoading}>
        <Col className="search-results-page">
          <Row>
            <SearchResults
              app={app}
              dispatch={dispatch}
              history={history}
              search={search}
              handlePageChange={this.search.bind(this)}
              handleSearch={this.search.bind(this)}
            />
            <ResultsMap
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
    search: state.search,
    app: state.app,
    router: state.router
  }
}

export default connect(select)(SearchResultsWrapper)
