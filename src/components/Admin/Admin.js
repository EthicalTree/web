import './Admin.css'

import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import Tags from './Tags'

import { Route, withRouter, Redirect, Link } from 'react-router-dom'
import {
  Container,
  Nav,
  NavItem,
  TabContent,
  TabPane
} from 'reactstrap'

import { isAdmin } from '../../utils/permissions'

class Admin extends React.Component {
  render() {
    const { location } =  this.props

    if (!isAdmin()) {
      return <Redirect to='/' />
    }

    console.log(location)

    return (
      <Container className="mt-5 admin">
        <h3>Admin</h3>
        <br />


        <Nav pills>
          <NavItem>
            <Link className="nav-link" to="/admin/users">Users</Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/admin/tabs">Tabs</Link>
          </NavItem>
        </Nav>
        <TabContent>
          <TabPane>
            <div className="p-2">
              <Route path="/admin/users" exact={true} component={Users} />
              <Route path="/admin/tags" exact={true} component={Tags} />
            </div>
          </TabPane>
        </TabContent>
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
