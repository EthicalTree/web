import './Admin.css'

import React from 'react'
import cn from 'classnames'
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
    const { pathname } = location

    if (!isAdmin()) {
      return <Redirect to='/' />
    }

    return (
      <Container className="mt-5 admin">
        <Nav pills>
          <NavItem>
            <Link
              className={cn('nav-link', { active: pathname === '/admin/users' })}
              to="/admin/users"
            >
              Users
            </Link>
          </NavItem>
          <NavItem>
            <Link
              className={cn('nav-link', { active: pathname === '/admin/tags' })}
              to="/admin/tags"
            >
              Tags
            </Link>
          </NavItem>
        </Nav>
        <TabContent>
          <TabPane>
            <div className="pt-4">
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
