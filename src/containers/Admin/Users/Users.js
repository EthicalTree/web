import React from 'react'
import { connect } from 'react-redux'

import {
  Table
} from 'reactstrap'

import { Loader } from '../../../components/Loader'
import { Paginator } from '../../../components/Paginator'

import { getUsers, toggleAdmin } from '../../../actions/admin'

export class Users extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(getUsers({ page: 1 }))
    document.title = "EthicalTree · User Admin"
  }

  toggleAdmin(user_id, e) {
    const { dispatch } = this.props
    const checked = e.target.checked

    e.preventDefault()

    dispatch(toggleAdmin({
      id: user_id,
      admin: checked
    }))
  }

  render() {
    const { dispatch, admin } = this.props
    const users = admin.users.sort((u1, u2) => u1.id - u2.id)

    return (
      <Loader loading={admin.isAdminLoading}>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Email</th>
              <th className="no-stretch">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={!!u.admin}
                    onChange={e => this.toggleAdmin(u.id, e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-center">
          <Paginator
            pageCount={admin.totalPages}
            currentPage={admin.currentPage}
            onPageChange={data => dispatch(getUsers({ page: data.selected }))}
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

export default connect(select)(Users)
