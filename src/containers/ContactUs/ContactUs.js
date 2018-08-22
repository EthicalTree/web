import './ContactUs.css'

import React from 'react'
import { Container } from 'reactstrap'
import { Helmet } from 'react-helmet'
import { Icon } from '../../components/Icon'

export const ContactUs = props => {
  return (
    <div className="contact-us">
      <Helmet>
        <title>{`Contact Us · EthicalTree`}</title>
        <meta name="description" content={`Contact EthicalTree`} />
      </Helmet>
      <Container>
        <h1 className="mt-5">Contact Us</h1>

        <div className="pt-4 pb-4">
          <p>Thanks for visiting EthicalTree.com!</p>

          <p>
            We’re a small team but we’re constantly looking for ways to grow and
            improve our service. If you have feedback or questions for us,
            please email us at the address below. If you love our project and
            you’re part of a business or organization that would like to explore
            a partnership with us, we’d love to hear from you too!
          </p>

          <p>
            If you are a business owner looking to promote your business on
            EthicalTree, or if you would like more information on ethical
            consumerism in Ottawa, email us directly at the address below.
          </p>
        </div>

        <div className="info-group">
          <div className="d-flex mb-3">
            <Icon iconKey="email" />
            <a href="mailto: info@ethicaltree.com">info@ethicaltree.com</a>
          </div>

          <div className="d-flex">
            <Icon iconKey="phone" />
            613-413-0063
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ContactUs
