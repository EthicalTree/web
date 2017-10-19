import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'

import { Route, withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'

class Admin extends React.Component {

  componentWillMount() {
    const { session, history } = this.props

    if (!session.currentUser || !session.currentUser.admin) {
      history.push('/')
    }
  }

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
    session: state.session
  }
}

export default withRouter(connect(select)(Admin))
