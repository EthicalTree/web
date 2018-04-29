import './CuratedListPage.css'

import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

import { Loader } from '../../components/Loader'
import { Result } from '../../components/Search/Result'
import { Paginator } from '../../components/Paginator'
import { Featured } from '../../components/Listing/Featured'

import { getCuratedList } from '../../actions/curatedList'

export class CuratedListPage extends React.Component {

  componentDidMount() {
    this.fetchCuratedList()
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props

    if (user.location !== prevProps.user.location) {
      this.fetchCuratedList()
    }
  }

  fetchCuratedList() {
    const { dispatch, match } = this.props

    dispatch(getCuratedList({
      slug: match.params.slug,
      page: 1
    }))
  }

  render() {
    const { dispatch, curatedList } = this.props

    return (
      <div className="curated-list-page">
        <Loader
          loading={curatedList.isLoading}
          fixed={true}
        >

          <h2 className="curated-list-title text-center">
            {curatedList.name}
          </h2>

          <div className="curated-list-listings">
            {curatedList.listings.map(l => {
              return (
                <div key={l.id} className="curated-list-listing">
                  <Result
                    listing={l}
                    location="Collection Page"
                  />
                </div>
              )
            })}
          </div>

          <Paginator
            className="text-center"
            pageCount={curatedList.totalPages}
            currentPage={curatedList.currentPage}
            onPageChange={data => dispatch(getCuratedList({
              slug: curatedList.slug,
              page: data.selected
            }))}
          />

          <Container className="mb-4">
            <Featured
              lg={3}
            />
          </Container>

        </Loader>
      </div>
    )
  }
}

const select = state => ({
  curatedList: state.curatedList,
  user: state.user
})

export default connect(select)(CuratedListPage)
