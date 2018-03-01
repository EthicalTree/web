import React from 'react'
import { connect } from 'react-redux'

import {
  Button,
  Input,
  Table
} from 'reactstrap'

import { Search } from '../Search'

import { Icon } from '../../../components/Icon'
import { Paginator } from '../../../components/Paginator'
import { Loader } from '../../../components/Loader'

import { setConfirm } from '../../../actions/confirm'
import { getTags, setTagUseType, deleteTag } from '../../../actions/admin'

export class Tags extends React.Component {

  handleDelete = id => {
    const { dispatch } = this.props

    return event => {
      event.preventDefault()
      dispatch(setConfirm({
        title: 'Delete Tag',
        msg: 'Are you sure you want to delete this tag?',
        action: deleteTag,
        data: id
      }))
    }
  }

  handleUseTypeChange = id => {
    const { dispatch } = this.props

    return event => {
      dispatch(setTagUseType(id, event.target.value))
    }
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({ type: 'SET_ADMIN_SEARCH_QUERY', data: '' })
    dispatch(getTags({ page: 1, query: '' }))
    document.title = "EthicalTree · Tag Admin"
  }

  render() {
    const { dispatch, admin } = this.props
    const tags = admin.tags.sort((t1, t2) => t1.hashtag - t2.hashtag)

    return (
      <Loader loading={admin.isAdminLoading}>

        <h4 className="mt-3 mb-3 d-flex justify-content-between">
          Tags

          <div className="d-flex">
            <Button
              className="mr-4"
              color="default"
              onClick={() => dispatch({ type: 'OPEN_MODAL', data: 'new-tag' })}
            >
              + New Tag
            </Button>

            <Search
              handleSearch={() => dispatch(getTags({ page: 1, query: admin.query }))}
            />
          </div>
        </h4>

        <Table bordered responsive>
          <thead>
            <tr>
              <th>Tag</th>
              <th className="no-stretch">Listing Count</th>
              <th className="use-type-col">Use Type</th>
              <th className="no-stretch">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags.map(t => {
              return (
                <tr key={`${t.id}-${t.hashtag}`}>
                  <td>{`#${t.hashtag}`}</td>
                  <td className="text-center">{t.listingCount}</td>
                  <td>
                    <Input
                      type="select"
                      name="use_type"
                      onChange={this.handleUseTypeChange(t.id)}
                      defaultValue={t.useType}
                    >
                      <option>category</option>
                      <option>admin</option>
                    </Input>
                  </td>
                  <td>
                    <Icon
                      iconKey="trash"
                      title="Delete Tag"
                      className="delete-tag"
                      clickable
                      onClick={this.handleDelete(t.id)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <div className="text-center">
          <Paginator
            pageCount={admin.totalPages}
            currentPage={admin.currentPage}
            onPageChange={data => dispatch(getTags({ page: data.selected }))}
          />
        </div>
      </Loader>
    )
  }
}

const select = (state) => {
  return {
    admin: state.admin
  }
}

export default connect(select)(Tags)
