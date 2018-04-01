import './CuratedListPage.css'

import React from 'react'
import { connect } from 'react-redux'

import { Loader } from '../../components/Loader'
import { Result } from '../../components/Search/Result'
import { Paginator } from '../../components/Paginator'

import { getCuratedList } from '../../actions/curatedList'

export class CuratedListPage extends React.Component {

  componentDidMount() {
    const { dispatch, match } = this.props

    dispatch(getCuratedList({
      hashtag: match.params.hashtag,
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
                  <Result listing={l} />
                </div>
              )
            })}
          </div>

          <Paginator
            className="text-center"
            pageCount={curatedList.totalPages}
            currentPage={curatedList.currentPage}
            onPageChange={data => dispatch(getCuratedList({
              hashtag: curatedList.hashtag,
              page: data.selected
            }))}
          />
        </Loader>
      </div>
    )
  }
}

const select = state => ({
  curatedList: state.curatedList
})

export default connect(select)(CuratedListPage)
