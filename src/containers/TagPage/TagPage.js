import './TagPage.css'

import React from 'react'
import { connect } from 'react-redux'

import { Loader } from '../../components/Loader'
import { Result } from '../../components/Search/Result'
import { Paginator } from '../../components/Paginator'

import { getTag } from '../../actions/tag'

export class TagPage extends React.Component {

  componentDidMount() {
    const { dispatch, match } = this.props

    dispatch(getTag({
      hashtag: match.params.hashtag,
      page: 1
    }))
  }

  render() {
    const { dispatch, tag } = this.props

    return (
      <div className="tag-page">
        <Loader
          loading={tag.isTagLoading}
          fixed={true}
        >

          <h2 className="tag-title text-center">
            #{tag.hashtag}
          </h2>

          <div className="tag-listings">
            {tag.listings.map(l => {
              return (
                <div key={l.id} className="tag-listing">
                  <Result listing={l} />
                </div>
              )
            })}
          </div>

          <Paginator
            className="text-center"
            pageCount={tag.totalPages}
            currentPage={tag.currentPage}
            onPageChange={data => dispatch(getTag({
              hashtag: tag.hashtag,
              page: data.selected
            }))}
          />
        </Loader>
      </div>
    )
  }
}

const select = state => ({
  tag: state.tag
})

export default connect(select)(TagPage)
