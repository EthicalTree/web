import './FrontPage.css'

import React from 'react'
import { connect } from 'react-redux'

import {
  Container,
  Col
} from 'reactstrap'

import { EthicalityBar } from '../../components/Ethicality'
import { Search } from '../../components/Search'
import { CuratedList } from '../../components/CuratedList'
import { Loader } from '../../components/Loader'

import { toggleSearchEthicalities } from '../../actions/search'
import { getCuratedLists } from '../../actions/app'

export class FrontPage extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCuratedLists())

    document.title = 'EthicalTree'
  }

  render() {
    const {
      app,
      search,
      dispatch
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
          loading={app.areCuratedListsLoading}
          className="curated-lists"
        >
          {app.curatedLists.map(cl => {
            return (
              <CuratedList
                key={cl.id}
                {...cl}
                location="front_page"
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
    search: state.search,
    curatedLists: state.curatedLists
  }
}

export default connect(select)(FrontPage)
