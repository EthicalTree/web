import './AdminPage.css'

import React from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import { Users } from '../Users'
import { Listings } from '../Listings'
import { Tags } from '../Tags'
import { Collections } from '../Collections'
import { Locations } from '../Locations'
import { Export } from '../Export'

import { Route, withRouter, Redirect, Link } from 'react-router-dom'

import { Container, Nav, NavItem, TabContent, TabPane } from 'reactstrap'

import { isAdmin } from '../../../utils/permissions'

export class AdminPage extends React.Component {
  render() {
    const { location } = this.props
    const { pathname } = location

    if (!isAdmin()) {
      return <Redirect to="/" />
    }

    return (
      <Container className="mt-5 admin">
        <div className="admin-header">
          <Nav pills>
            <NavItem>
              <Link
                className={cn('nav-link', {
                  active: pathname === '/admin/users',
                })}
                to="/admin/users">
                Users
              </Link>
            </NavItem>
            <NavItem>
              <Link
                className={cn('nav-link', {
                  active: pathname === '/admin/listings',
                })}
                to="/admin/listings">
                Listings
              </Link>
            </NavItem>
            <NavItem>
              <Link
                className={cn('nav-link', {
                  active: pathname === '/admin/tags',
                })}
                to="/admin/tags">
                Tags
              </Link>
            </NavItem>
            <NavItem>
              <Link
                className={cn('nav-link', {
                  active: pathname === '/admin/collections',
                })}
                to="/admin/collections">
                Collections
              </Link>
            </NavItem>
            <NavItem>
              <Link
                className={cn('nav-link', {
                  active: pathname === '/admin/locations',
                })}
                to="/admin/locations">
                Locations
              </Link>
            </NavItem>
            <NavItem>
              <div className="vertical-separator" />
            </NavItem>
            <NavItem>
              <Link
                className={cn('nav-link', {
                  active: pathname === '/admin/export',
                })}
                to="/admin/export">
                Export
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
              <Route
                path="/admin/collections"
                exact={true}
                component={Collections}
              />
              <Route
                path="/admin/locations"
                exact={true}
                component={Locations}
              />
              <Route path="/admin/export" exact={true} component={Export} />
            </div>
          </TabPane>
        </TabContent>
      </Container>
    )
  }
}

const select = state => {
  return {
    session: state.session,
  }
}

export default withRouter(connect(select)(AdminPage))
