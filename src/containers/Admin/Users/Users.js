import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { Table } from 'reactstrap'

import { Search } from '../Search'

import { Icon } from '../../../components/Icon'
import { Loader } from '../../../components/Loader'
import { Paginator } from '../../../components/Paginator'

import { getUsers, editUser } from '../../../actions/admin'

export class Users extends React.Component {
  verifyUser = (id, verified) => {
    const { dispatch } = this.props

    return () => {
      dispatch(editUser({ id, verified }))
    }
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({ type: 'SET_ADMIN_SEARCH_QUERY', data: '' })
    dispatch(getUsers({ page: 1, query: '' }))
  }

  toggleAdmin(userId, e) {
    const { dispatch } = this.props
    const checked = e.target.checked

    e.preventDefault()

    dispatch(
      editUser({
        id: userId,
        admin: checked,
      })
    )
  }

  render() {
    const { dispatch, admin } = this.props
    const users = admin.users.sort((u1, u2) => u1.id - u2.id)

    return (
      <Loader loading={admin.isAdminLoading}>
        <Helmet>
          <title>{'EthicalTree Admin · Users'}</title>
        </Helmet>

        <h4 className="mt-3 mb-3 d-flex justify-content-between">
          Users
          <Search
            handleSearch={() =>
              dispatch(getUsers({ page: 1, query: admin.query }))
            }
          />
        </h4>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Email</th>
              <th className="no-stretch">Contact Number</th>
              <th className="no-stretch">Company Position</th>
              <th className="no-stretch">Verified</th>
              <th className="no-stretch">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.displayNameWithEmail}</td>
                <td>{u.contactNumber}</td>
                <td>{u.position}</td>
                <td>
                  {u.confirmedAt ? (
                    <Icon
                      iconKey="check"
                      title="Verified (click to un-verify)"
                      clickable
                      onClick={this.verifyUser(u.id, false)}
                    />
                  ) : (
                    <Icon
                      iconKey="cross"
                      title="Not Verified (click to verify)"
                      clickable
                      onClick={this.verifyUser(u.id, true)}
                    />
                  )}
                </td>
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
            currentPage={admin.currentPage || 1}
            onPageChange={data => dispatch(getUsers({ page: data.selected }))}
          />
        </div>
      </Loader>
    )
  }
}

const select = state => {
  return {
    admin: state.admin,
  }
}

export default connect(select)(Users)
