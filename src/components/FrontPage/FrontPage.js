import './FrontPage.sass'

import React from 'react'
import { connect } from 'react-redux'

import {
  Container,
  Col
} from 'reactstrap'

import { EthicalityBar } from '../Ethicality/Ethicality'
import { Search } from '../Search'
import { toggleSearchEthicalities } from '../../actions/search'

const FrontPage = (props) => {
  const { app, search, dispatch, history } = props

  const ethicalities = app.ethicalities || []
  const selectedEthicalities = search.selectedEthicalities || []

  return (
    <div
      style={{
      }}
      className="front-page">

      <Container className="text-center">
        <Col className="headline" xs="12">
          <h1>Find local places that <span className="text-info">care</span> about what you care about.</h1>
        </Col>

        <Col xs="12">
          <Search
            history={history}
          />
        </Col>

        <Col xs="12">
          <EthicalityBar
            className="text-center mt-5 pb-5"
            ethicalities={ethicalities}
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
    </div>
  )
}

const select = (state) => {
  return {
    app: state.app,
    search: state.search
  }
}

export default connect(select)(FrontPage)
