import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'

import { Route, withRouter, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'

import { isAdmin } from '../../utils/permissions'

class Admin extends React.Component {
  render() {
    if (!isAdmin()) {
      return <Redirect to='/' />
    }

    return (
      <Container className="mt-5">
        <h1>Admin</h1>
        <br />
        <Route path="/admin/users" exact={true} component={Users} />
      </Container>
    )
  }
}

const select = (state) => {
  return {
    session: state.session
  }
}

export default withRouter(connect(select)(Admin))
