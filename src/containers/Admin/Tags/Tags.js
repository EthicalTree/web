import React from 'react'
import { connect } from 'react-redux'

import {
  Table,
  Input
} from 'reactstrap'

import { Icon } from '../../../components/Util/Icons'
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

    dispatch(getTags({ page: 1 }))
  }

  render() {
    const { dispatch, admin } = this.props
    const tags = admin.tags.sort((t1, t2) => t1.hashtag - t2.hashtag)

    return (
      <Loader loading={admin.isAdminLoading}>
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
            {tags.map(t => (
              <tr key={t.id}>
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
                  <a
                    href=""
                    title="Delete Tag"
                    className="delete-tag"
                    onClick={this.handleDelete(t.id)}
                  >
                    <Icon iconKey="trash" />
                  </a>
                </td>
              </tr>
            ))}
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
