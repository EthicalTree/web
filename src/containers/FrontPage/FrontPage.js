import './FrontPage.css'

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  Container,
  Col
} from 'reactstrap'

import { EthicalityBar } from '../../components/Ethicality'
import { Search } from '../../components/Search'
import { Collection } from '../../components/Collection'
import { Loader } from '../../components/Loader'

import { toggleSearchEthicalities } from '../../actions/search'
import { getCollections } from '../../actions/frontPage'

export class FrontPage extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCollections())
  }

  componentDidUpdate(prevProps) {
    const { dispatch, user } = this.props

    if (user.location !== prevProps.user.location) {
      dispatch(getCollections())
    }
  }

  render() {
    const {
      app,
      frontPage,
      dispatch,
      search,
      user
    } = this.props

    const ethicalities = app.ethicalities || []
    const selectedEthicalities = search.selectedEthicalities || []

    return (
      <div className="front-page">
        <Container className="text-center">
          <Col className="headline" xs="12">
            <h1>Find local places that <span className="text-info">care</span> about what you care about.</h1>
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
                  type: 'SET_SEARCH_ETHICALITIES',
                  data: toggleSearchEthicalities(selectedEthicalities, slug)
                })
              }}
              selectedEthicalities={selectedEthicalities}
            />
          </Col>
        </Container>

        <Loader
          loading={frontPage.areCollectionsLoading}
          className="collections"
        >
          {frontPage.collections.map(cl => {
            return (
              <Collection
                city={user.city}
                key={cl.id}
                {...cl}
              />
            )
          })}
        </Loader>
      </div>
    )
  }
}

const select = (state) => {
  return {
    app: state.app,
    frontPage: state.frontPage,
    search: state.search,
    user: state.user
  }
}

export default withRouter(connect(select)(FrontPage))
