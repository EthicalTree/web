import './Header.css'

import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

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
  DropdownItem,
} from 'reactstrap'

import AccountIcon from '../Session/AccountIcon'
import { Search } from '../Search'
import { SkipLink } from '../SkipLink'
import { EthicalityBar } from '../Ethicality/Ethicality'

import etLogo from './images/et-logo.svg'
import { isCurrentPath } from '../../utils/url'
import { trackEvent } from '../../utils/ga'

import { toggleSearchEthicalities } from '../../actions/search'

const Header = props => {
  const {
    dispatch,
    app,
    handleSkip,
    header,
    location,
    search,
    session,
  } = props

  const isFixed = isCurrentPath('/s/')
  const hasSubHeaderSearch = !isCurrentPath('/s/') && location.pathname !== '/'
  const hasHeaderSearch = isCurrentPath('/s/')

  const fixedHeader = isFixed ? 'fixed-top' : ''
  const fixedHeaderWrapper = isFixed ? 'fixed-header-wrapper' : ''

  return (
    <header className={fixedHeaderWrapper}>
      <Navbar light expand="xl" className={fixedHeader}>
        <SkipLink handleSkip={handleSkip} />

        <Link
          className="navbar-brand"
          to="/"
          onClick={() => {
            trackEvent({
              action: 'Clicked Home Button',
              category: 'General',
            })
          }}>
          <span className="sr-only">EthicalTree</span>
          <img className="ml-4 mr-2" src={etLogo} alt="EthicalTree Logo" />
        </Link>

        {hasHeaderSearch && (
          <Col lg="7" className="d-none d-lg-block">
            <Search />
          </Col>
        )}

        <NavbarToggler
          onClick={e => {
            dispatch({ type: 'TOGGLE_HEADER_ACCESSIBLE' })
          }}
        />

        <Collapse isOpen={header.isOpen} navbar>
          <Nav navbar className="ml-auto">
            <div className="mr-3 d-flex">
              <NavItem>
                <a
                  className="nav-link"
                  href=""
                  onClick={e => {
                    e.preventDefault()
                    dispatch({ type: 'OPEN_MODAL', data: 'feedback' })
                  }}>
                  Feedback
                </a>
              </NavItem>

              <NavItem>
                <Link
                  to={search.location ? `/collections/${search.location.city}` : `/collections`}
                  className="nav-link">
                  Collections
                </Link>
              </NavItem>
            </div>

            {session.user && (
              <React.Fragment>
                <NavItem>
                  <Button
                    color="success"
                    block
                    onClick={e => {
                      dispatch({ type: 'OPEN_MODAL', data: 'add-listing' })
                    }}>
                    Add Listing
                  </Button>
                </NavItem>

                <Dropdown
                  nav
                  className="account-dropdown"
                  isOpen={header.isAccountDropdownOpen}
                  toggle={() =>
                    dispatch({ type: 'TOGGLE_HEADER_ACCOUNT_DROPDOWN' })
                  }>
                  <DropdownToggle nav caret>
                    <AccountIcon email={session.user.email} />
                  </DropdownToggle>
                  <DropdownMenu right>
                    {session.user.admin && (
                      <Link to="/admin/users">
                        <DropdownItem>Admin</DropdownItem>
                      </Link>
                    )}

                    <Link to="/account">
                      <DropdownItem>Account Settings</DropdownItem>
                    </Link>

                    <DropdownItem
                      onClick={e => {
                        dispatch({ type: 'OPEN_MODAL', data: 'logout' })
                      }}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </React.Fragment>
            )}

            {!session.user && (
              <React.Fragment>
                <NavItem>
                  <NavLink
                    href="#"
                    onClick={e => {
                      dispatch({ type: 'OPEN_MODAL', data: 'signup' })
                    }}>
                    Signup
                  </NavLink>
                </NavItem>

                <NavItem className="mr-4">
                  <NavLink
                    href="#"
                    onClick={e => {
                      dispatch({ type: 'OPEN_MODAL', data: 'login' })
                    }}>
                    Login
                  </NavLink>
                </NavItem>
              </React.Fragment>
            )}
          </Nav>
        </Collapse>
      </Navbar>

      {hasSubHeaderSearch && (
        <React.Fragment>
          <Col className="global-ethicality-bar pt-2 pb-2">
            <Col lg="7" xl="5" className="">
              <Search />
            </Col>

            <Col>
              <EthicalityBar
                className=""
                showLabels={true}
                showTooltips={false}
                showIcons={true}
                ethicalities={app.ethicalities}
                onEthicalitySelect={slug => {
                  dispatch({
                    type: 'SET_SEARCH_QUERY_PARAMS',
                    data: {
                      ethicalities: toggleSearchEthicalities(
                        search.selectedEthicalities,
                        slug
                      ),
                    },
                  })
                }}
                selectedEthicalities={search.selectedEthicalities}
              />
            </Col>
          </Col>
        </React.Fragment>
      )}
    </header>
  )
}

const select = state => {
  return {
    app: state.app,
    session: state.session,
    search: state.search,
    header: state.header,
    user: state.user,
  }
}

export default withRouter(connect(select)(Header))
