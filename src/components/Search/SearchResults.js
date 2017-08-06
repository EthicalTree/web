import './SearchResults.sass'

import React from 'react'
import { connect } from 'react-redux'

import {
  Row,
  Col,
  Card,
  CardBlock,
  CardTitle
} from 'reactstrap'

import Loader from '../Global/Loader'
import { EthicalityBar, EthicalityIcon } from '../Ethicality/Ethicality'
import { Paginator } from '../Util/Paginator'

import { performSearch } from '../../actions/search'
import { gotoListing } from '../../actions/listing'

const MapArea = (props) => {
  return (
    <Col sm="4">
    </Col>
  )
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
      <Col xs="12" sm="6" xl="4" className="pt-3 pb-1 pl-4 pr-4">
        <Card className="search-result hoverable" onClick={viewListing}>
          <div
            className="card-img"
            style={extraStyle}
          >

          </div>
          <CardBlock>
            <CardTitle>
              {listing.title}
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
            </CardTitle>

          </CardBlock>
        </Card>
      </Col>
    )
  }

}

const SearchResults = (props) => {
  const { app, search, dispatch, history } = props

  const ethicalities = app.ethicalities || []
  const selectedEthicalities = search.selectedEthicalities || []

  return (
    <Col xs="12" xl="8" className="search-results p-4">
      <EthicalityBar
        showLabels={false}
        ethicalities={ethicalities}
        onEthicalitySelect={slug => { dispatch({ type: 'TOGGLE_SEARCH_ETHICALITY', data: slug }) }}
        selectedEthicalities={selectedEthicalities}
      />

      <Row className="d-flex align-items-stretch">
        {search.listings && search.listings.length > 0 &&
          search.listings.map(result => {
            const listing = {
              title: result.title,
              ethicalities: result.ethicalities.map(e => e.icon_key),
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
      </Row>

      <Row className="text-center">
        <Paginator
          pageCount={search.pageCount}
          currentPage={search.currentPage}
          onPageChange={data => props.handlePageChange(data.selected)}
        />
      </Row>
    </Col>
  )
}

class SearchResultsPage extends React.Component {

  componentDidMount() {
    this.search()
  }

  search(newPage=0) {
    const { match, dispatch, search, history } = this.props
    const query = search.query ? search.query : match.params.query

    dispatch(performSearch(query, search.selectedEthicalities, history, newPage))
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
            />
            <MapArea search={search} />
          </Row>
        </Col>
      </Loader>
    )
  }

}

const select = (state) => {
  return {
    search: state.search,
    app: state.app
  }
}

export default connect(select)(SearchResultsPage)
