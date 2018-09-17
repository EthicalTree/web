import './CollectionPage.css'

import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Col, Row, Container, Jumbotron } from 'reactstrap'
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
    displayMode: 'listing',
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    const { city } = match.params

    dispatch(setSearchLocation({ location: city }))

    this.fetchCollection()
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props
    const didLocationChange = search.location !== prevProps.search.location

    if (didLocationChange) {
      this.fetchCollection()
    }
  }

  fetchCollection() {
    const { dispatch, match, search } = this.props

    dispatch(
      getCollection({
        location: search.location,
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
    const { dispatch, collection, session, search } = this.props
    const { selectedResult, displayMode } = this.state

    const title = search.location
      ? `${search.location.city}'s ${
          collection.name
        } - Best Local Restaurants, Shops and More · EthicalTree`
      : `${
          collection.name
        } - Best Local Restaurants, Shops and More · EthicalTree`

    const jumbotronClasses = classnames({
      'has-image': collection.coverImage,
    })

    let headerStyles

    const collectionTitle = search.location
      ? `${search.location.city} ${collection.name}`
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
        <Loader
          loading={collection.isLoading}
          fixed={true}
          render={() => (
            <React.Fragment>
              <Helmet>
                <title>{title}</title>
                <meta
                  name="description"
                  content={`${collection.description}`}
                />
              </Helmet>

              <Jumbotron className={jumbotronClasses} style={headerStyles}>
                <div className="collection-banner">
                  <h1 className="collection-title">{collectionTitle}</h1>

                  {collection.description && (
                    <h5 className="collection-description">
                      {collection.description}
                    </h5>
                  )}
                </div>
              </Jumbotron>

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
                  mapHeight={500}
                />
                <div className={`search-results ${mobileCollectionHidden}`}>
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
                            xl="3"
                          >
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
                    <Col xs="12" lg="12" xl="12" className="col-xxl-12">
                      <div className="d-flex flex-wrap flex-direction-column">
                        <Featured sm={6} lg={4} xl={3} xxl={3} />
                      </div>
                    </Col>
                  </Row>
                </div>

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
  search: state.search,
})

export default connect(select)(CollectionPage)
