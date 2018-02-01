import './SearchResults.css'

import React from 'react'
import { connect } from 'react-redux'
import { Search } from '../Search'
import ResultsMap from './ResultsMap'
import MapSwitcher from './MapSwitcher'
import OpenClose from '../Util/DateTime/OpenClose'

import querystring from 'querystring'
import { OverlayView } from 'react-google-maps'

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap'

import Loader from '../Global/Loader'
import { EthicalityBar, EthicalityIcon } from '../Ethicality/Ethicality'
import { Paginator } from '../Util/Paginator/Paginator'

import { performSearch, toggleSearchEthicalities } from '../../actions/search'
import { gotoListing } from '../../actions/listing'

class Result extends React.Component {

  constructor(props) {
    super(props)

    const { listing } = props

    this.state = {
      currentImage: listing.images[0]
    }
  }

  render() {
    const { listing, viewListing, hovered, className } = this.props
    const { currentImage } = this.state

    const extraStyle = currentImage ? { backgroundImage: `url(${process.env.REACT_APP_S3_URL}/${currentImage.key})` }  : {}
    const hoveredClass = hovered ? 'hovered' : ''

    return (
      <Col xs="12" sm="6" lg="4" className="pt-3 pb-1 pl-4 pr-4">
        <Card className={`search-result hoverable ${hoveredClass} ${className}`} onClick={viewListing}>
          <div
            className="card-img"
            style={extraStyle}
          >
          </div>
          <CardBody>
            <CardTitle className="d-flex justify-content-between flex-row-reverse">
              <div className="ethicalities d-flex">
                {listing.ethicalities.map(ethicality => {
                  return (
                    <EthicalityIcon
                      className="ml-2"
                      ethicalityKey={ethicality.iconKey}
                      key={ethicality.iconKey}
                    />
                  )
                })}
              </div>
              <span className="text-truncate">
                {listing.title}
              </span>
            </CardTitle>

            <OpenClose status={listing.openStatus} />
          </CardBody>
        </Card>
      </Col>
    )
  }

}

Result.defaultProps = {
  className: '',
  smallView: false
}

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

      <Row className="d-flex align-items-stretch">
        {hasListings &&
          search.listings.map(listing => (
            <Result
              key={listing.slug}
              listing={listing}
              hovered={listing.slug === search.hoveredResult}
              viewListing={() => dispatch(gotoListing(listing.slug, history))}
            />
          ))
        }
        {!hasListings &&
          <Col className="text-center pt-5">
            No listings found!
          </Col>
        }
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
    const { dispatch, history } = this.props
    const { selectedResult, listings } = this.props.search

    if (selectedResult) {
      const listing = listings.find(r => r.slug === selectedResult)
      const location = listing.locations[0]

      return (
        <OverlayView
          position={location}
          onClick={e => { console.log('inside overlay') }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={width => ({x: -(width / 2), y: -190})}
        >
          <Result
            className="result-overlay"
            key={listing.slug}
            listing={listing}
            viewListing={() => {
              dispatch({ type: 'SET_SEARCH_RESULT_HOVER', data: null })
              dispatch({ type: 'SET_SELECTED_SEARCH_RESULT', data: null })
              dispatch(gotoListing(listing.slug, history))
            }}
            smallView={true}
          />
        </OverlayView>
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
              dispatch={dispatch}
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
