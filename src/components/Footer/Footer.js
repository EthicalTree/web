import './Footer.css'

import React from 'react'
import classnames from 'classnames'
import moment from 'moment-timezone'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'

import { Icon } from '../Icon'

import { isCurrentPath } from '../../utils/url'
import { trackEvent } from '../../utils/ga'

class Footer extends React.PureComponent {
  render() {
    const { dispatch } = this.props
    const classNames = classnames({ 'has-fixed-header': isCurrentPath('/s/') })

    return (
      <footer className={classNames}>
        <Container>
          <div>
            Copyright © 2016-
            {moment().format('YYYY')} | EthicalTree Inc.
          </div>

          <div>
            <a
              href=""
              onClick={e => {
                e.preventDefault()
                dispatch({ type: 'OPEN_MODAL', data: 'feedback' })
              }}
            >
              Feedback
            </a>

            <Link to="/business/advertise">Business Owners</Link>

            <Link to="/about-us">About Us</Link>

            <Link to="/faq">FAQ</Link>

            <Link to="/contact-us">Contact Us</Link>

            <Link to="/terms-of-service">Terms of Service</Link>

            <div className="social">
              <a
                href="https://www.instagram.com/ethicaltree/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent({
                    action: 'Clicked Social Media',
                    category: 'Social Media',
                    label: 'Instagram',
                  })
                }}
              >
                <Icon iconKey="instagram" />
              </a>

              <a
                href="https://www.facebook.com/ethicaltree"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent({
                    action: 'Clicked Social Media',
                    category: 'Social Media',
                    label: 'Facebook',
                  })
                }}
              >
                <Icon iconKey="facebook" />
              </a>

              <a
                href="https://www.twitter.com/ethicaltree"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent({
                    action: 'Clicked Social Media',
                    category: 'Social Media',
                    label: 'Twitter',
                  })
                }}
              >
                <Icon iconKey="twitter" />
              </a>
            </div>
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
