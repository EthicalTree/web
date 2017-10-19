import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'

import { Route } from 'react-router-dom'
import { Container } from 'reactstrap'

class Admin extends React.Component {
  render() {
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
  }
}

export default connect(select)(Admin)
