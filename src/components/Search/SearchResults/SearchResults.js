import React from 'react'
import { Row, Col } from 'reactstrap'

import { Search } from '../Search'
import { Result } from '../Result'
import { Featured } from '../../Listing/Featured'

import { EthicalityBar } from '../../Ethicality/Ethicality'
import { Paginator } from '../../Paginator'

import { toggleSearchEthicalities } from '../../../actions/search'

export class SearchResults extends React.Component {

  renderResultsHeader() {
    const { search } = this.props

    if (search.matches === 0) {
      return (
        <React.Fragment>
          <div className="no-matches">
            Oh no, nothing matched your search!
          </div>

          <h5 className="p-3">Places you might like</h5>
        </React.Fragment>
      )
    }

    return (
      <h5 className="p-3">Search Results</h5>
    )
  }

  render() {
    const { app, search, dispatch, handleSearch } = this.props

    const ethicalities = app.ethicalities
    const selectedEthicalities = search.selectedEthicalities

    const hasListings = search.listings && search.listings.length > 0
    const mobileHidden = search.resultMode === 'map' ? 'd-none d-xl-block' : ''

    const onEthicalitySelect = slug => {
      const newSelectedEthicalities = toggleSearchEthicalities(selectedEthicalities, slug)

      dispatch({ type: 'SET_SEARCH_ETHICALITIES', data: newSelectedEthicalities })
      handleSearch(0, newSelectedEthicalities)
    }

    return (
      <Col xs="12" xl="6" className={`search-results col-xxl-8 p-4 ${mobileHidden}`}>
        <Col className="d-lg-none d-xl-none mb-3" >
          <Search />
        </Col>
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
          <Col xs="12" lg="9" xl="12" className="col-xxl-9">
            <div className="search-listings">

              {this.renderResultsHeader()}

              <div className="d-flex flex-wrap align-items-stretch">
                {hasListings &&
                  search.listings.map(listing => (
                    <Col key={listing.slug} xs="12" sm="6" lg="4" xl="6" className="col-xxl-4">
                      <Result
                        listing={listing}
                        hovered={listing.slug === search.hoveredResult}
                        location="Search Results"
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

          <Col xs="12" lg="3" xl="12" className="col-xxl-3">
            <div className="d-flex flex-wrap flex-direction-column">
              <Featured
                sm={6}
                lg={12}
                xl={6}
                xxl={12}
              />
            </div>
          </Col>
        </Row>

        {hasListings && search.matches > 0 &&
          <Row className="text-center">
            <Paginator
              pageCount={search.pageCount}
              currentPage={search.currentPage}
              onPageChange={data => this.props.handlePageChange(data.selected)}
            />
          </Row>
        }

      </Col>
    )
  }
}

export default SearchResults
