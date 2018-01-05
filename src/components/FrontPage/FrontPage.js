import './FrontPage.sass'

import React from 'react'
import { connect } from 'react-redux'

import {
  Container,
  Col
} from 'reactstrap'

import { Search, SearchTagsBar } from '../Search'

const FrontPage = (props) => {
  const { search, dispatch } = props

  return (
    <div
      style={{
      }}
      className="front-page">

      <Container>
        <Col className="headline text-center" xs="12">
          <h1>Find local places that <span className="text-info">care</span> about what you care about.</h1>
        </Col>

        <Col xs="12">
          <Search />
        </Col>

        <Col xs="12">
          <SearchTagsBar
            className="d-lg-none"
            tags={search.selectedTags}
            handleTagRemove={tag => dispatch({ type: 'REMOVE_TAG_FROM_SEARCH', data: tag })}
          />
        </Col>
      </Container>
    </div>
  )
}

const select = (state) => {
  return {
    search: state.search
  }
}

export default connect(select)(FrontPage)
