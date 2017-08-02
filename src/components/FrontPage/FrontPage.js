import './FrontPage.sass'

import React from 'react'
import { connect } from 'react-redux'

import {
  Container,
  Col
} from 'reactstrap'

import Ethicality from '../Ethicality/Ethicality'
import Search from '../Search'

const FrontPage = (props) => {
  const { app, search, dispatch } = props

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
          <Search />
        </Col>

        <Col xs="12">
          <div className="text-center mt-5 pb-5">
            {ethicalities.map(ethicality => {
              return (
                <span key={ethicality.slug} className="p-2">
                  <Ethicality
                    className="p-3"
                    name={ethicality.name}
                    slug={ethicality.slug}
                    icon_key={ethicality.icon_key}
                    selected={!!selectedEthicalities.find(e => e === ethicality.slug)}
                    onSelect={slug => { dispatch({ type: 'TOGGLE_SEARCH_ETHICALITY', data: slug }) }}
                  />
                </span>
              )
            })}
          </div>
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
