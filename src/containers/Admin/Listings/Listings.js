import React from 'react'
import { connect } from 'react-redux'

import {
  Input,
  Table
} from 'reactstrap'

import { Loader } from '../../../components/Loader'
import { Paginator } from '../../../components/Paginator'

import { getListings, setListingVisibility } from '../../../actions/admin'

export class Listings extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(getListings({ page: 1 }))
  }

  handleVisibilityChange = id => {
    const { dispatch } = this.props

    return event => {
      dispatch(setListingVisibility(id, event.target.value))
    }
  }

  render() {
    const { dispatch, admin } = this.props

    return (
      <Loader loading={admin.isAdminLoading}>
        <Table bordered responsive>
          <thead>
            <tr>
              <th className="no-stretch">ID</th>
              <th>Title</th>
              <th className="visibility-col">Visibility</th>
            </tr>
          </thead>
          <tbody>
            {admin.listings.map(l => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.title}</td>
                <td>
                  <Input
                    type="select"
                    name="visibility"
                    onChange={this.handleVisibilityChange(l.id)}
                    defaultValue={l.visibility}
                  >
                    <option value="published">Visible (Published)</option>
                    <option value="unpublished">Hidden (Un-Published)</option>
                  </Input>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-center">
          <Paginator
            pageCount={admin.totalPages}
            currentPage={admin.currentPage}
            onPageChange={data => dispatch(getListings({ page: data.selected }))}
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

export default connect(select)(Listings)
