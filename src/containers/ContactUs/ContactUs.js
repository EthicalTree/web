import './ContactUs.css'

import React from 'react'
import { Container, Jumbotron } from 'reactstrap'
import { Helmet } from 'react-helmet'
import { ContactInfo } from '../../components/ContactInfo'

export const ContactUs = () => {
  return (
    <div className="contact-us public-content">
      <Helmet>
        <title>{'Contact Us · EthicalTree'}</title>
        <meta name="description" content={'Contact EthicalTree'} />
      </Helmet>

      <Jumbotron>
        <h1>Contact Us</h1>
      </Jumbotron>

      <Container>
        <div>
          <h4>Thanks for visiting EthicalTree.com!</h4>

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

        <ContactInfo />
      </Container>
    </div>
  )
}

export default ContactUs
