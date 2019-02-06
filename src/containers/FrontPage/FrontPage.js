import './FrontPage.css'

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Container, Col } from 'reactstrap'

import { EthicalityBar } from '../../components/Ethicality'
import { Search } from '../../components/Search'
import { NeighbourhoodCard } from '../../components/NeighbourhoodCard'
import { InlineCollection } from '../../components/InlineCollection'
import { Collections } from '../Collections'

import { toggleSearchEthicalities } from '../../actions/search'

import { getSeoText } from '../../utils/seo'

export class FrontPage extends React.Component {
  render() {
    const { app, collections, dispatch, search } = this.props

    const ethicalities = app.ethicalities || []
    const selectedEthicalities = search.selectedEthicalities || []

    const title = search.location
      ? `EthicalTree ${
          search.location.city
        } · Best Local Restaurants, Shops, and More`
      : 'EthicalTree · Best Local Restaurants, Shops, and More'

    const description = search.location
      ? `Best of ${
          search.location.city
        }'s restaurants, bakeries, cafés and stores. Organic, Woman-Owned, Fair Trade, Vegan, Vegetarian.`
      : 'Best restaurants, bakeries, cafés and stores. Organic, Woman-Owned, Fair Trade, Vegan, Vegetarian.'

    const featuredCollection = collections.collections.find(
      c => c.slug === 'featured'
    )

    return (
      <div className="front-page">
        <Helmet>
          <title>{getSeoText('title', title)}</title>
          <meta
            name="description"
            content={getSeoText('description', description)}
          />
        </Helmet>

        <Container className="text-center">
          <Col xs="12">
            <h2 className="headline">
              Find local places that <span className="text-info">care</span>{' '}
              about what you care about.
            </h2>
          </Col>

          <Col xs="12">
            <Search />
          </Col>

          <Col xs="12">
            <EthicalityBar
              className="front-page-ethicalities justify-content-center"
              ethicalities={ethicalities}
              showIcons={true}
              onEthicalitySelect={slug => {
                dispatch({
                  type: 'SET_SEARCH_QUERY_PARAMS',
                  data: {
                    ethicalities: toggleSearchEthicalities(
                      selectedEthicalities,
                      slug,
                      true
                    ),
                  },
                })
              }}
              selectedEthicalities={selectedEthicalities}
            />
          </Col>
          <Col xs="12">
            {!search.location.id && null}
            {search.location &&
              search.location.city && (
                <NeighbourhoodCard
                  city={search.location.city}
                  neighbourhoods={search.location.neighbourhoods}
                />
              )}
          </Col>

          <Col xs="12">
            {featuredCollection && (
              <InlineCollection
                city={search.location.city}
                {...featuredCollection}
              />
            )}
          </Col>

          <Col xs="12">
            <Collections />
          </Col>
        </Container>
      </div>
    )
  }
}

const select = state => {
  return {
    app: state.app,
    collections: state.collections,
    search: state.search,
  }
}

export default withRouter(connect(select)(FrontPage))
