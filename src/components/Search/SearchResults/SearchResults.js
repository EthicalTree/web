import React from 'react'
import { Row, Col } from 'reactstrap'

import { Search } from '../Search'
import { Result, ResultSkeleton } from '../../Search/Result'
import { Featured } from '../../Listing/Featured'

import { EthicalityBar } from '../../Ethicality/Ethicality'
import { FilterBar } from '../../Filters/Filter'
import { Paginator } from '../../Paginator'

import { toggleSearchEthicalities, setSearchUrl } from '../../../actions/search'

import { genDummyList } from '../../../utils/skeleton'

export class SearchResults extends React.Component {
  handleResize = () => {
    this.setState({ minHeight: window.innerHeight })
  }

  constructor(props) {
    super(props)

    this.state = {
      minHeight: window.innerHeight,
    }

    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  renderResultsHeader() {
    const { search } = this.props

    if (search.matches === 0 && !search.isLoading) {
      return (
        <React.Fragment>
          <div className="no-matches">Oh no, nothing matched your search!</div>

          <h5 className="results-header">Places you might like</h5>
        </React.Fragment>
      )
    }

    return <h5 className="results-header">Search Results</h5>
  }

  render() {
    const { app, search, session, dispatch } = this.props
    const { minHeight } = this.state

    const ethicalities = app.ethicalities
    const selectedEthicalities = search.selectedEthicalities

    const hasListings = search.listings && search.listings.length > 0
    const mobileHidden = search.resultMode === 'map' ? 'd-none d-xl-block' : ''

    const onEthicalitySelect = slug => {
      dispatch(
        setSearchUrl(search, {
          ethicalities: toggleSearchEthicalities(
            search.selectedEthicalities,
            slug,
            true
          ),
          page: 1,
        })
      )
    }

    return (
      <Col
        xs="12"
        xl="6"
        className={`search-results col-xxl-8 p-4 ${mobileHidden}`}
        style={{ minHeight }}
      >
        <Col className="d-lg-none d-xl-none mb-3">
          <Search />
        </Col>

        <div className="search-filters">
          <EthicalityBar
            className="search-results-ethicalities justify-content-start"
            showLabels={true}
            showTooltips={false}
            showIcons={true}
            ethicalities={ethicalities}
            onEthicalitySelect={onEthicalitySelect}
            selectedEthicalities={selectedEthicalities}
          />
          <FilterBar search={search} dispatch={dispatch} />
        </div>

        <Row className="mt-2 no-gutters">
          <Col xs="12" lg="9" xl="12" className="col-xxl-9">
            <div className="search-listings">
              {this.renderResultsHeader()}

              <div className="d-flex flex-wrap align-items-stretch">
                {!search.isLoading &&
                  hasListings &&
                  search.listings.map(listing => (
                    <Col
                      key={listing.slug}
                      xs="12"
                      sm="6"
                      lg="4"
                      xl="6"
                      className="col-xxl-4"
                    >
                      <Result
                        listing={listing}
                        hovered={listing.slug === search.hoveredResult}
                        location="Search Results"
                        session={session}
                      />
                    </Col>
                  ))}

                {search.isLoading &&
                  genDummyList(10).map(x => (
                    <Col
                      key={x}
                      xs="12"
                      sm="6"
                      lg="4"
                      xl="6"
                      className="col-xxl-4"
                    >
                      <ResultSkeleton key={x} />
                    </Col>
                  ))}

                {!hasListings &&
                  !search.isLoading && (
                    <Col className="text-center pt-5">No listings found!</Col>
                  )}
              </div>
            </div>
          </Col>

          <Col xs="12" lg="3" xl="12" className="col-xxl-3">
            <div className="d-flex flex-wrap flex-direction-column">
              <Featured
                hoveredResult={search.hoveredResult}
                location={search.location}
                key="search-results-featured"
                sm={6}
                lg={12}
                xl={6}
                xxl={12}
              />
            </div>
          </Col>
        </Row>

        {!search.isLoading &&
          hasListings &&
          search.matches > 0 && (
            <Row className="text-center">
              <Paginator
                pageCount={search.pageCount}
                currentPage={search.currentPage}
                onPageChange={data => {
                  dispatch(
                    setSearchUrl(search, {
                      page: data.selected,
                    })
                  )
                }}
              />
            </Row>
          )}
      </Col>
    )
  }
}

export default SearchResults
