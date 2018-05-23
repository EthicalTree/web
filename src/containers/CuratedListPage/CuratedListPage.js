import './CuratedListPage.css'

import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

import { Loader } from '../../components/Loader'
import { Result } from '../../components/Search/Result'
import { Paginator } from '../../components/Paginator'
import { Featured } from '../../components/Listing/Featured'

import { getCuratedList } from '../../actions/curatedList'
import { setSearchLocation } from '../../actions/search'
import { getSavedSearchLocation } from '../../utils/address'

export class CuratedListPage extends React.Component {

  componentWillMount() {
    const { dispatch, match } = this.props
    const { city } = match.params

    if (city) {
      dispatch(setSearchLocation(city))
    }
  }

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
    const location = getSavedSearchLocation()

    return (
      <div className="curated-list-page">
        <Loader
          loading={curatedList.isLoading}
          fixed={true}
        >

          <h2 className="curated-list-title text-center">
            {curatedList.name} ({ location })
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

            {curatedList.listings.length === 0 &&
              <i>There are no listings in this collection for your selected location.</i>
            }
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
