import './Header.sass'

import React from 'react'
import { connect } from 'react-redux'

import { Link, withRouter } from 'react-router-dom'
import AccountIcon from '../Session/AccountIcon'
import { Search } from '../Search'

import {
  Button,
  Navbar,
  NavbarToggler,
  Collapse,
  Col,
  Nav,
  NavItem,
  NavLink,
  NavDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

const FixedPaths = [
  '/s/'
]

export const hasFixedHeader = () => {
  return FixedPaths.filter(
    fp => window.location.pathname.startsWith(fp)
  ).length
}

const Header = (props) => {
  const { dispatch, session, header, history } = props

  const isFixed = hasFixedHeader()
  const fixedHeader = isFixed ? 'fixed-top' : ''
  const fixedHeaderWrapper = isFixed ? 'fixed-header-wrapper' : ''

  return (
    <div className={fixedHeaderWrapper}>
      <Navbar light toggleable className={fixedHeader}>
        <NavbarToggler right onClick={e => { dispatch({ type: 'TOGGLE_HEADER_ACCESSIBLE' }) }} />

        <Link className="navbar-brand" to="/">
          <span className="sr-only">EthicalTree</span>
          <img className="ml-4" src="/assets/images/logo/logo-48x48.png" alt="EthicalTree Logo" />
        </Link>

        <Col sm="4">
          <Search />
        </Col>

        <Collapse isOpen={header.isOpen} navbar>
          {session.user &&
            <Nav navbar className="right-nav ml-auto">
              <NavItem>
                <Button
                  color="success"
                  className="mr-3"
                  onClick={e => { dispatch({ type: 'OPEN_MODAL', data: 'add_listing' }) }}>
                  Add Listing
                </Button>
              </NavItem>

              <NavDropdown
                className="account-dropdown"
                isOpen={header.isAccountDropdownOpen}
                toggle={() => dispatch({ type: 'TOGGLE_HEADER_ACCOUNT_DROPDOWN' })}
              >
                <DropdownToggle nav caret>
                  <AccountIcon email={session.user.email} />
                </DropdownToggle>
                <DropdownMenu right className="mt-2">
                  <DropdownItem onClick={e => { history.push('/account') }}>
                    Account Settings
                  </DropdownItem>
                  <DropdownItem onClick={e => { dispatch({ type: 'OPEN_MODAL', data: 'logout' }) }}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </NavDropdown>
            </Nav>
          }

          {!session.user &&
            <Nav navbar className="mr-4 ml-auto">
              <NavItem>
                <NavLink
                  href="#"
                  onClick={e => { dispatch({ type: 'OPEN_MODAL', data: 'signup' }) }}>
                  Signup
                </NavLink>
              </NavItem>

              <NavItem className="mr-4">
                <NavLink
                  href="#"
                  onClick={e => { dispatch({ type: 'OPEN_MODAL', data: 'login' }) }}>
                  Login
                </NavLink>
              </NavItem>
            </Nav>
          }
        </Collapse>
      </Navbar>
    </div>
  )
}

const select = (state) => {
  return {
    session: state.session,
    header: state.header
  }
}

export default withRouter(connect(select)(Header))

