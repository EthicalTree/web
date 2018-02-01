import React from 'react'
import { connect } from 'react-redux'
import Loader from '../Global/Loader'

import {
  Table
} from 'reactstrap'

import { getUsers, toggleAdmin } from '../../actions/admin'

class Users extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(getUsers())
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
    const { admin } = this.props
    const users = admin.users.sort((u1, u2) => u1.id - u2.id)

    return (
      <Loader loading={admin.isUserAdminLoading}>
        <Table responsive>
          <thead>
            <tr>
              <th>Email</th>
              <th>Admin</th>
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
