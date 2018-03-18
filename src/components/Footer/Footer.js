import './Footer.css'

import React from 'react'
import classnames from 'classnames'
import moment from 'moment-timezone'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'

import { hasFixedHeader } from '../Header'

class Footer extends React.PureComponent {
  render() {
    const classNames = classnames(
      { 'has-fixed-header': hasFixedHeader() }
    )

    return (
      <footer className={classNames}>
        <Container>
          <div>
            Copyright © 2016-{moment().format('YYYY')} | EthicalTree Inc.
          </div>

          <div>
            <Link to="/contact-us">
              Contact Us
            </Link>

            <Link to="/terms-of-service">
              Terms of Service
            </Link>
          </div>
        </Container>
      </footer>
    )
  }
}

const select = state => ({
  header: state.header,
})

export default withRouter(connect(select)(Footer))

