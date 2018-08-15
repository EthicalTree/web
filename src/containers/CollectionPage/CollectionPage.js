import './CollectionPage.css'

import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { Helmet } from 'react-helmet'

import { Loader } from '../../components/Loader'
import { Result } from '../../components/Search/Result'
import { Paginator } from '../../components/Paginator'
import { Featured } from '../../components/Listing/Featured'
import { MapSwitcher } from '../../components/Search/MapSwitcher'

import { getCollection } from '../../actions/collection'
import { setSearchLocation } from '../../actions/search'
import { ResultsMap } from '../../components/Search/ResultsMap'
import { ListingOverlay } from '../../components/Maps/CustomOverlayView'

export class CollectionPage extends React.Component {
  state = {
    selectedResult: '',
    hoveredResult: '',
    displayMode: 'listing',
  }

  componentDidMount() {
    const { dispatch, match, user } = this.props
    const { city } = match.params

    if (city.toLowerCase() !== user.city.toLowerCase()) {
      dispatch(setSearchLocation(city, city))
    }

    this.fetchCollection()
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props
    const didLocationChange = user.location !== prevProps.user.location

    if (didLocationChange) {
      this.fetchCollection()
    }
  }

  fetchCollection() {
    const { dispatch, match } = this.props

    dispatch(
      getCollection({
        slug: match.params.slug,
        page: 1,
      })
    )
  }

  getOverlay() {
    const { collection, session } = this.props
    const { selectedResult } = this.state

    const selectedListing = collection.listings.find(
      r => r.slug === selectedResult
    )

    if (selectedListing) {
      return <ListingOverlay listing={selectedListing} session={session} />
    }
  }

  render() {
    const { dispatch, collection, session, user } = this.props
    const { selectedResult, displayMode } = this.state
    let headerStyles

    if (collection.coverImage) {
      headerStyles = {
        backgroundImage: `url(${collection.coverImage.url})`,
      }
    }

    const mobileCollectionHidden = displayMode === 'map' ? 'd-none d-xl-block' : ''

    return (
      <div className="collection-page">
        <Loader
          loading={collection.isLoading}
          fixed={true}
          render={() => (
            <React.Fragment>
              <Helmet>
                <title>{`${user.city}'s ${
                  collection.name
                } - Best Local Restaurants, Shops and More · EthicalTree`}</title>
                <meta
                  name="description"
                  content={`${collection.description}`}
                />
              </Helmet>

              <div
                className={classnames('collection-header', 'text-center', {
                  'has-image': collection.coverImage,
                })}
                style={headerStyles}>
                <div className="collection-banner">
                  <h2 className="collection-title">
                    {collection.name} ({user.city})
                  </h2>

                  {collection.description && (
                    <h5 className="collection-description">
                      {collection.description}
                    </h5>
                  )}
                </div>
              </div>

              <Row>
                <Col xs="12" xl="8" className={`search-results col-xxl-8 p-4 ${mobileCollectionHidden}`}>
                  <Row className="mt-2 no-gutters">
                    <div className="collection-listings">
                      {collection.listings.map(l => {
                        return (
                          <Col
                            key={l.id}
                            className="collection-listing col-xxl-4"
                            xs="12"
                            sm="6"
                            lg="4"
                            xl="6">
                            <Result
                              listing={l}
                              location="Collection Page"
                              session={session}
                            />
                          </Col>
                        )
                      })}

                      {collection.listings.length === 0 && (
                        <i>
                          There are no listings in this collection for your
                          selected location.
                        </i>
                      )}
                    </div>
                    <Col xs="12" lg="3" xl="12" className="col-xxl-3">
                      <div className="d-flex flex-wrap flex-direction-column">
                        <Featured sm={6} lg={12} xl={6} xxl={12} />
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Row className="text-center">
                  <Paginator
                    className="text-center"
                    pageCount={collection.totalPages}
                    currentPage={collection.currentPage}
                    onPageChange={data =>
                      dispatch(
                        getCollection({
                          slug: collection.slug,
                          page: data.selected,
                        })
                      )
                    }
                  />
                </Row>

                <ResultsMap
                  handleMarkerClick={slug => {
                    const newSlug =
                      !!selectedResult && selectedResult === slug ? null : slug
                    this.setState({
                      selectedResult: newSlug,
                      hoveredResult: newSlug,
                    })
                  }}
                  handleMarkerMouseOver={slug =>
                    this.setState({ hoveredResult: slug })
                  }
                  handleMarkerMouseOut={() =>
                    this.setState({ hoveredResult: '' })
                  }
                  handleMapClick={() => {
                    setTimeout(() => {
                      this.setState({ selectedResult: '' })
                    }, 0)
                  }}
                  listings={collection.listings}
                  resultMode={displayMode}
                  overlay={this.getOverlay()}
                  mapHeight={800}
                  scrollTop={86}
                />
              </Row>

              <MapSwitcher
                mode={displayMode}
                onClick={() => this.setState({displayMode: displayMode === 'listing' ? 'map' : 'listing'})}
                showText="Show Collection"
              />

            </React.Fragment>
          )}
        />
      </div>
    )
  }
}

const select = state => ({
  collection: state.collection,
  session: state.session,
  user: state.user,
})

export default connect(select)(CollectionPage)
