import './AdminPage.css'

import React from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import { Users } from '../Users'
import { Listings } from '../Listings'
import { Tags } from '../Tags'
import { Lists } from '../Lists'

import { Route, withRouter, Redirect, Link } from 'react-router-dom'

import {
  Container,
  Nav,
  NavItem,
  TabContent,
  TabPane
} from 'reactstrap'

import { getPlans } from '../../../actions/plan'
import { isAdmin } from '../../../utils/permissions'

export class AdminPage extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getPlans())
  }

  render() {
    const { location } =  this.props
    const { pathname } = location

    if (!isAdmin()) {
      return <Redirect to='/' />
    }

    return (
      <Container className="mt-5 admin">
        <div className="admin-header">
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
                className={cn('nav-link', { active: pathname === '/admin/listings' })}
                to="/admin/listings"
              >
                Listings
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
            <NavItem>
              <Link
                className={cn('nav-link', { active: pathname === '/admin/lists' })}
                to="/admin/lists"
              >
                Lists
              </Link>
            </NavItem>
          </Nav>
        </div>
        <TabContent>
          <TabPane>
            <div className="pt-4">
              <Route path="/admin/users" exact={true} component={Users} />
              <Route path="/admin/listings" exact={true} component={Listings} />
              <Route path="/admin/tags" exact={true} component={Tags} />
              <Route path="/admin/lists" exact={true} component={Lists} />
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

export default withRouter(connect(select)(AdminPage))
