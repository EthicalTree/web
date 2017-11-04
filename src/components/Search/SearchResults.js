/* global google */
import './SearchResults.sass'

import React from 'react'
import { connect } from 'react-redux'
import { Marker } from 'react-google-maps'
import { Search } from '../Search'
import querystring from 'querystring'

import {
  Row,
  Col,
  Card,
  CardBlock,
  CardTitle
} from 'reactstrap'

import Loader from '../Global/Loader'
import Map from '../Global/Map'
import { EthicalityBar, EthicalityIcon } from '../Ethicality/Ethicality'
import { Paginator } from '../Util/Paginator'

import { performSearch, toggleSearchEthicalities } from '../../actions/search'
import { gotoListing } from '../../actions/listing'

class MapArea extends React.Component {

  render() {
    const { search } = this.props
    let bounds = new google.maps.LatLngBounds()

    const markers = search.listings.map(listing => {
      const l = listing.locations[0]
      const { lat, lng } = l
      bounds.extend(new google.maps.LatLng(lat, lng))
      return <Marker key={l.id} position={l} />
    })

    return (
      <Col className="search-map-area" sm="4">
        <div className="search-map">
          <Map
            onLoad={map => { map && map.fitBounds(bounds) }}
            onClick={e => {}}
            markers={markers}
            defaultOptions={{
              zoomControl: true,
              draggableCursor: 'pointer'
            }}
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }/>
        </div>
      </Col>
    )
  }

}

class Result extends React.Component {

  constructor(props) {
    super(props)

    const { listing } = props

    this.state = {
      currentImage: listing.images[0]
    }
  }

  render() {
    const { listing, viewListing } = this.props
    const { currentImage } = this.state

    const backgroundImage = `url(${process.env.REACT_APP_S3_URL}/${currentImage})`
    const extraStyle = currentImage ? { backgroundImage } : {}

    return (
      <Col xs="12" sm="6" lg="4" className="pt-3 pb-1 pl-4 pr-4">
        <Card className="search-result hoverable" onClick={viewListing}>
          <div
            className="card-img"
            style={extraStyle}
          >

          </div>
          <CardBlock>
            <CardTitle className="d-flex justify-content-between flex-row-reverse">
              <span className="ethicalities">
                {listing.ethicalities.map(iconKey => {
                  return (
                    <EthicalityIcon
                      className="ml-2"
                      ethicalityKey={iconKey}
                      key={iconKey}
                    />
                  )
                })}
              </span>
              <span className="text-truncate">
                {listing.title}
              </span>
            </CardTitle>

          </CardBlock>
        </Card>
      </Col>
    )
  }

}

const SearchResults = (props) => {
  const { app, search, dispatch, history, handleSearch } = props

  const ethicalities = app.ethicalities || []
  const selectedEthicalities = search.selectedEthicalities || []

  const hasSearch = history.location.pathname !== '/'
  const hasListings = search.listings && search.listings.length > 0

  const onEthicalitySelect = slug => {
    const newSelectedEthicalities = toggleSearchEthicalities(selectedEthicalities, slug)

    dispatch({ type: 'SET_SEARCH_ETHICALITIES', data: newSelectedEthicalities })
    handleSearch(0, newSelectedEthicalities)
  }

  return (
    <Col xs="12" xl="8" className="search-results p-4">
      {hasSearch &&
        <Col sm="6" lg="4" className="hidden-sm-up mb-3" >
          <Search />
        </Col>
      }
      <EthicalityBar
        className="search-results-ethicalities"
        showLabels={false}
        showTooltips={true}
        ethicalities={ethicalities}
        onEthicalitySelect={onEthicalitySelect}
        selectedEthicalities={selectedEthicalities}
      />

      <Row className="d-flex align-items-stretch">
        {hasListings &&
          search.listings.map(result => {
            const listing = {
              title: result.title,
              ethicalities: result.ethicalities.map(e => e.iconKey),
              images: result.images.map(i => i.key)
            }

            return (
              <Result
                key={result.slug}
                listing={listing}
                viewListing={() => dispatch(gotoListing(result.slug, history))}
              />
            )
          })
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
    dispatch({ type: 'SET_SEARCH_ETHICALITIES', data: queryParams.ethicalities})
  }

  componentDidMount() {
    const queryParams = this.getQueryParams()

    this.performSearch(queryParams.page, queryParams.ethicalities)
  }

  performSearch(newPage=0, ethicalities) {
    const { match, dispatch, search } = this.props
    const query = search.query ? search.query : match.params.query || ''
    const selectedEthicalities = ethicalities ? ethicalities : search.selectedEthicalities

    dispatch(performSearch(query, selectedEthicalities, newPage))
  }

  search(newPage=0, ethicalities) {
    const { search, history, dispatch } = this.props

    const paramsObj = {
      ethicalities: ethicalities.join(','),
      page: newPage
    }

    dispatch({ type: 'SET_SEARCH_QUERY', data: search.query })
    history.push(`/s/${search.query}?${querystring.stringify(paramsObj)}`)
  }

  render() {
    const { search, app, dispatch, history } = this.props

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
            <MapArea
              search={search}
            />
          </Row>

        </Col>
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
