import './AboutUs.css'

import React from 'react'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'

export const AboutUs = props => {
  return (
    <div className="about-us">
      <Helmet>
        <title>{`About Us · EthicalTree`}</title>
        <meta name="description" content={`EthicalTree About Us`} />
      </Helmet>
      <Container>
        <h1 className="mt-5 mb-5">About Us</h1>

        <h4 className="mb-4">
          Welcome to EthicalTree – Ethical business directory!
        </h4>

        <p>
          Here you can find thousands of restaurants, cafés, shops, and other
          businesses in the Toronto, Ottawa, Gatineau, and Kingston area that
          sell products or services based on the ethical preferences that matter
          to you. Try a search by selecting your preferences for businesses you
          wish to support, whether that means Veg-Friendly, Fair Trade, Organic,
          or Woman-Owned. We make it easy for you to filter based on the values
          that matter to you, and we will be adding many more criteria to filter
          with as we grow.
        </p>

        <p>
          EthicalTree.com is an entirely free service for consumers, operated by
          three friends – Willy, Siavash, and Frank. Our vision is to make it
          easier for consumers to make buying decisions based on their ethical
          values, and ultimately to encourage and support more businesses in
          offering goods and services that align with the ethical values of
          their customers.
        </p>

        <p>
          EthicalTree also works with local businesses who target
          ethically-oriented consumers. If you are a business owner looking to
          promote your business through EthicalTree, or if you are interested in
          learning more about how we can help you drive more consumers to your
          door, please contact us and we’ll get back to you quickly!
        </p>

        <p>
          Email: <a href="mailto:info@ethicaltree.com">info@ethicaltree.com</a>
        </p>
        <p>Phone: 613-413-0063</p>

        <h4 className="mt-5 mb-4">Mentions of EthicalTree in the Media</h4>

        <p>
          Check out some of the following links for mentions of EthicalTree!
        </p>

        <div className="et-mentions">
          <a
            href="http://glueottawa.com/2018/02/12/no-need-to-call-the-ethics-commissioner-on-this-ottawa-startup/"
            target="_blank"
            rel="noopener noreferrer">
            Glue Magazine (February 12, 2018)
          </a>

          <br />

          <a
            href="https://issuu.com/kingstonheritage/docs/kingston_110817"
            target="_blank"
            rel="noopener noreferrer">
            Frontenac Gazette / Kingston Heritage (October 27, 2017)
          </a>

          <br />

          <a
            href="https://thegreenpages.ca/2017/07/25/ethicaltree-hopes-to-connect-ethically-oriented-consumers-and-businesses/"
            target="_blank"
            rel="noopener noreferrer">
            The Green Pages (July 25, 2017)
          </a>

          <br />

          <a
            href="http://www.larotonde.ca/entreprises-ethiques-dottawa-a-portee-de-main/"
            target="_blank"
            rel="noopener noreferrer">
            La Rotonde (July 4, 2017)
          </a>

          <br />

          <a
            href="http://apt613.ca/ethicaltree/"
            target="_blank"
            rel="noopener noreferrer">
            Apt 613 (May 23, 2017)
          </a>

          <br />

          <a
            href="http://www.justchange.ca/april-2017-ethicaltree/"
            target="_blank"
            rel="noopener noreferrer">
            JustChange (April 3, 2017)
          </a>

          <br />

          <a
            href="http://thesustainabilitree.blogspot.ca/2017/03/impacts-impact-sustainability-for.html"
            target="_blank"
            rel="noopener noreferrer">
            Sustainabilitree Blog (March 29, 2017)
          </a>

          <br />

          <a
            href="http://ottawa.impacthub.net/2017/02/21/impact-academy-2016-2017-meet-the-impacters/"
            target="_blank"
            rel="noopener noreferrer">
            ImpactHub Ottawa (February 21, 2017)
          </a>
        </div>
      </Container>
    </div>
  )
}

export default AboutUs
