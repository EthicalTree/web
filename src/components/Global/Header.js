import './Header.css'

import React from 'react'
import { connect } from 'react-redux'

import { Link, withRouter } from 'react-router-dom'
import AccountIcon from '../Session/AccountIcon'
import { Search } from '../Search'
import { Banner } from '../Banner'

import etLogo from './images/et-logo.svg'

import {
  Button,
  Navbar,
  NavbarToggler,
  Collapse,
  Col,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
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
  const hasSearch = history.location.pathname !== '/'
  const fixedHeader = isFixed ? 'fixed-top' : ''
  const fixedHeaderWrapper = isFixed ? 'fixed-header-wrapper' : ''

  return (
    <div className={fixedHeaderWrapper}>
      <Banner>
        Please take a moment to give us your feedback on our beta
        &nbsp;
        <a
          href="https://ethicaltree.wufoo.com/forms/m11y0bsz0si3gkw/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        . Your feedback is super important to us!
      </Banner>

      <Navbar light expand="md" className={fixedHeader}>

        <Link className="navbar-brand" to="/">
          <span className="sr-only">EthicalTree</span>
          <img className="ml-4 mr-2" src={etLogo} alt="EthicalTree Logo" />
        </Link>

        <NavbarToggler
          onClick={e => { dispatch({ type: 'TOGGLE_HEADER_ACCESSIBLE' }) }}
        />

        {hasSearch &&
          <Col lg="7" xl="5" className="mt-3 d-none d-lg-block">
            <Search />
          </Col>
        }

        <Collapse isOpen={header.isOpen} navbar>
          {session.user &&
            <Nav navbar className="ml-auto">
              <NavItem>
                <Button
                  color="success"
                  block
                  className="mt-3"
                  onClick={e => { dispatch({ type: 'OPEN_MODAL', data: 'add-listing' }) }}>
                  Add Listing
                </Button>
              </NavItem>

              <Dropdown
                nav
                className="account-dropdown"
                isOpen={header.isAccountDropdownOpen}
                toggle={() => dispatch({ type: 'TOGGLE_HEADER_ACCOUNT_DROPDOWN' })}
              >
                <DropdownToggle nav caret>
                  <AccountIcon email={session.user.email} />
                </DropdownToggle>
                <DropdownMenu right>
                  {session.user.admin &&
                    <Link to="/admin/users">
                      <DropdownItem>
                        Admin
                      </DropdownItem>
                    </Link>
                  }

                  <Link to="/account">
                    <DropdownItem>
                      Account Settings
                    </DropdownItem>
                  </Link>

                  <DropdownItem onClick={e => { dispatch({ type: 'OPEN_MODAL', data: 'logout' }) }}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
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

