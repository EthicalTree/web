import './Header.sass'

import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import {
  Button,
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

const Header = (props) => {
  const { dispatch } = props

  return (
    <div>
      <Navbar light toggleable>
        <NavbarToggler right onClick={e => { dispatch({ type: 'TOGGLE_HEADER_ACCESSIBLE' }) }} />

        <Link className="navbar-brand" to="/">
          <span className="sr-only">EthicalTree</span>
          <img className="ml-4" src="/assets/images/logo/logo-48x48.png" alt="EthicalTree Logo" />
        </Link>

        <Collapse isOpen={props.header.isOpen} navbar>
          {props.session.user &&
            <Nav navbar className="mr-4 ml-auto">
              <NavItem>
                <NavLink
                  href="#"
                  onClick={e => { dispatch({ type: 'SET_LOGOUT_MODAL', data: true }) }}>
                  Logout
                </NavLink>
              </NavItem>

              <NavItem>
                <Button
                  color="success"
                  className="ml-3"
                  onClick={e => { dispatch({ type: 'SET_ADD_LISTING_MODAL', data: true }) }}>
                  Add Listing
                </Button>
              </NavItem>
            </Nav>
          }

          {!props.session.user &&
            <Nav navbar className="mr-4 ml-auto">
              <NavItem>
                <NavLink
                  href="#"
                  onClick={e => { dispatch({ type: 'SET_SIGNUP_MODAL', data: true }) }}>
                  Signup
                </NavLink>
              </NavItem>

              <NavItem className="mr-4">
                <NavLink
                  href="#"
                  onClick={e => { dispatch({ type: 'SET_LOGIN_MODAL', data: true }) }}>
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

export default connect(select)(Header)

