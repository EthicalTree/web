import './CollectionPage.css'

import React, { Fragment } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Col, Row, Container, Jumbotron } from 'reactstrap'
import { Helmet } from 'react-helmet'
import { api } from '../../utils/api'

import { Result, ResultSkeleton } from '../../components/Search/Result'
import { CollectionBannerSkeleton } from './CollectionBannerSkeleton'
import { Paginator } from '../../components/Paginator'
import { Featured } from '../../components/Listing/Featured'
import { MapSwitcher } from '../../components/Search/MapSwitcher'

import { getCollection } from '../../actions/collection'
import { setSearchLocation } from '../../actions/search'
import { ResultsMap } from '../../components/Search/ResultsMap'
import { ListingOverlay } from '../../components/Maps/CustomOverlayView'

import { getSeoText } from '../../utils/seo'
import { genDummyList } from '../../utils/skeleton'

import head from 'lodash/head'

export class CollectionPage extends React.Component {
  state = {
    selectedResult: '',
    displayMode: 'listing',
    location: null,
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    const { city } = match.params

    dispatch(setSearchLocation({ location: city }))

    api.get(`/v1/locations?query=${city}`).then(results => {
      const location = head(results.data)

      this.setState({ location }, () => {
        this.fetchCollection()
      })
    })
  }

  fetchCollection(page = 1) {
    const { dispatch, match } = this.props
    const { location } = this.state

    dispatch(
      getCollection({
        location,
        slug: match.params.slug,
        page,
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
    const { collection, session } = this.props
    const { selectedResult, displayMode, location } = this.state

    const title = location
      ? `${location.city}'s ${
          collection.name
        } - Best Local Restaurants, Shops and More · EthicalTree`
      : `${
          collection.name
        } - Best Local Restaurants, Shops and More · EthicalTree`

    const jumbotronClasses = classnames({
      'has-image': collection.coverImage,
    })

    let headerStyles

    const collectionTitle = location
      ? `${location.city} ${collection.name}`
      : `${collection.name}`

    if (collection.coverImage) {
      headerStyles = {
        backgroundImage: `url(${collection.coverImage.url})`,
      }
    }

    const mobileCollectionHidden =
      displayMode === 'map' ? 'd-none d-xl-block' : ''

    return (
      <div className="collection-page">
        <Helmet>
          <title>{getSeoText('title', title)}</title>
          <meta
            name="description"
            content={getSeoText('description', collection.description)}
          />
        </Helmet>

        {/* Banner */}
        {collection.isLoading && (
          <CollectionBannerSkeleton style={{ backgroundColor: 'none' }} />
        )}

        {!collection.isLoading && (
          <Jumbotron className={jumbotronClasses} style={headerStyles}>
            <div className="collection-banner">
              <Fragment>
                <h1 className="collection-title">
                  {getSeoText('header', collectionTitle)}
                </h1>

                {collection.description && (
                  <h5 className="collection-description">
                    {collection.description}
                  </h5>
                )}
              </Fragment>
            </div>
          </Jumbotron>
        )}
        {/* Map */}
        <Container>
          <ResultsMap
            handleMarkerClick={slug => {
              const newSlug =
                !!selectedResult && selectedResult === slug ? null : slug
              this.setState({
                selectedResult: newSlug,
              })
            }}
            handleMapClick={() => {
              setTimeout(() => {
                this.setState({ selectedResult: '' })
              }, 0)
            }}
            listings={collection.listings}
            resultMode={displayMode}
            overlay={this.getOverlay()}
            style={{
              height: 400,
            }}
          />

          {/* Results */}
          <div className={`search-results ${mobileCollectionHidden}`}>
            <Row className="mt-2 no-gutters">
              <div className="collection-listings">
                {collection.isLoading &&
                  genDummyList(8).map(x => (
                    <Col
                      key={x}
                      className="collection-listing col-xxl-4"
                      xs="12"
                      sm="6"
                      lg="4"
                      xl="3"
                    >
                      <ResultSkeleton />
                    </Col>
                  ))}
                {!collection.isLoading &&
                  collection.listings.map(l => (
                    <Col
                      key={l.id}
                      className="collection-listing col-xxl-4"
                      xs="12"
                      sm="6"
                      lg="4"
                      xl="3"
                    >
                      <Result
                        listing={l}
                        location="Collection Page"
                        session={session}
                      />
                    </Col>
                  ))}
                {!collection.isLoading && collection.listings.length === 0 && (
                  <i>
                    There are no listings in this collection for your selected
                    location.
                  </i>
                )}
              </div>
              <Col xs="12" lg="12" xl="12" className="col-xxl-12">
                <div className="d-flex flex-wrap flex-direction-column">
                  <Featured location={location} sm={6} lg={4} xl={3} xxl={3} />
                </div>
              </Col>
            </Row>
          </div>

          <Row className="text-center">
            <Paginator
              className="text-center"
              pageCount={collection.totalPages}
              currentPage={collection.currentPage}
              onPageChange={({ selected }) => this.fetchCollection(selected)}
            />
          </Row>
        </Container>
        <MapSwitcher
          mode={displayMode}
          onClick={() =>
            this.setState({
              displayMode: displayMode === 'listing' ? 'map' : 'listing',
            })
          }
          showText="Show Collection"
        />
      </div>
    )
  }
}

const select = state => ({
  collection: state.collection,
  session: state.session,
})

export default connect(select)(CollectionPage)
