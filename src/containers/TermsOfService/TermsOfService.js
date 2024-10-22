import './TermsOfService.css'

import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Container, Jumbotron } from 'reactstrap'
import { getSeoText } from '../../utils/seo'

export const TermsOfService = () => {
  return (
    <div className="terms-of-service public-content">
      <Helmet>
        <title>{getSeoText('title', 'Terms of Service · EthicalTree')}</title>
        <meta
          name="description"
          content={getSeoText('description', 'EthicalTree Terms of Service')}
        />
      </Helmet>

      <Jumbotron>
        <h1>Terms of Service</h1>
        <small>Last updated: October 21, 2017</small>
      </Jumbotron>

      <Container>
        <div>
          <h4>Overview</h4>
          <p>
            Please read these Terms of Service (“Terms”, “Terms of Service”)
            carefully before using the https://ethicaltree.com/ website and its
            sub-domains (the “Service”) operated by EthicalTree Inc
            (“EthicalTree”, “us”, “we”, or “our”).
          </p>

          <p>
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users and others who access or use the Service.
          </p>

          <p>
            By accessing or using the Service you agree to be bound by these
            Terms. If you disagree with any part of the terms then you may not
            access the Service.
          </p>

          <h4>Links To Other Web Sites</h4>

          <p>
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by EthicalTree. EthicalTree has no
            control over, and assumes no responsibility for, the content,
            privacy policies, or practices of any third party web sites or
            services. You further acknowledge and agree that EthicalTree shall
            not be responsible or liable, directly or indirectly, for any damage
            or loss caused or alleged to be caused by or in connection with use
            of or reliance on any such content, goods or services available on
            or through any such web sites or services.
          </p>

          <p>
            We strongly advise you to read the terms and conditions and privacy
            policies of any third-party web sites or services that you visit.
          </p>

          <h4>Termination</h4>

          <p>
            We may terminate or suspend access to our Service immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms.
          </p>

          <p>
            All provisions of the Terms which by their nature should survive
            termination shall survive termination, including, without
            limitation, ownership provisions, warranty disclaimers, indemnity
            and limitations of liability.
          </p>

          <h4>Governing Law</h4>

          <p>
            These Terms shall be governed and construed in accordance with the
            laws of Ontario, Canada, without regard to its conflict of law
            provisions. Our failure to enforce any right or provision of these
            Terms will not be considered a waiver of those rights. If any
            provision of these Terms is held to be invalid or unenforceable by a
            court, the remaining provisions of these Terms will remain in
            effect. These Terms constitute the entire agreement between us
            regarding our Service, and supersede and replace any prior
            agreements we might have between us regarding the Service.
          </p>

          <h4>Changes</h4>

          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion. By continuing to access or use our Service after
            those revisions become effective, you agree to be bound by the
            revised terms. If you do not agree to the new terms, please stop
            using the Service.
          </p>

          <h4>Contact Us</h4>

          <p>
            If you have any questions about these Terms, please&nbsp;
            <Link to="/contact-us">contact us</Link>.
          </p>
        </div>
      </Container>
    </div>
  )
}

export default TermsOfService
