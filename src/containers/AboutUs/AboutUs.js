import './AboutUs.css'

import React from 'react'
import { Helmet } from 'react-helmet'
import { Container, Jumbotron } from 'reactstrap'
import { ContactInfo } from '../../components/ContactInfo'
import { getSeoText } from '../../utils/seo'

export const AboutUs = () => {
  return (
    <div className="about-us public-content">
      <Helmet>
        <title>{getSeoText('title', 'About Us · EthicalTree')}</title>
        <meta
          name="description"
          content={getSeoText('description', 'EthicalTree About Us')}
        />
      </Helmet>

      <Jumbotron>
        <h1>About Us</h1>
      </Jumbotron>

      <Container>
        <h2>Welcome to EthicalTree – Ethical business directory!</h2>

        <p>
          Here you can find thousands of restaurants, cafés, shops, and other
          businesses in the Toronto, Ottawa, Gatineau, and Kingston areas that
          sell products or services based on the ethical preferences that matter
          to you. Try a search by selecting your preferences for businesses you
          wish to support, whether that means Veg-Friendly, Fair Trade, Organic,
          or Woman-Owned. We make it easy for you to filter based on the values
          that matter to you, and we will be adding many more criteria to filter
          with as we grow.
        </p>

        <p>
          EthicalTree.com is an entirely free service for consumers, founded in
          2016 by three friends – Willy, Siavash, and Frank. Our vision is to
          make it easier for consumers to make buying decisions based on their
          ethical values, and ultimately to encourage and support more
          businesses in offering goods and services that align with the ethical
          values of their customers.
        </p>

        <p>
          EthicalTree also works with local businesses who want to grow their
          customer base by targetting the growing ethical consumer markets. If
          you are a business owner,{' '}
          <a
            href="https://ethicaltree.com/business/advertise"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here to learn about EthicalTree's free and paid options
          </a>{' '}
          to grow your business on our platform and reach new customer segments.
        </p>

        <hr />

        <ContactInfo />

        <hr />

        <h3>EthicalTree in the Media</h3>

        <ul className="et-mentions">
          <li>
            <a
              href="https://www.uottawa.ca/gazette/en/news/creativity-display-startup-garage-rally"
              target="_blank"
              rel="noopener noreferrer"
            >
              uOttawa Gazette (September 11, 2018)
            </a>
          </li>

          <li>
            <a
              href="http://www.obj.ca/techopia-university-ottawa-startup-garage-rally"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ottawa Business Journal (August 7, 2018)
            </a>
          </li>

          <li>
            <a
              href="http://www.obj.ca/article/ottawa-based-ethical-tree-simplifying-search-vegan-and-ethical-restaurants"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ottawa Business Journal (June 15, 2018)
            </a>
          </li>

          <li>
            <a
              href="https://globalnews.ca/news/4155690/vegan-dining-restaurants-canada/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Global News (April 19, 2018)
            </a>
          </li>

          <li>
            <a
              href="http://glueottawa.com/2018/02/12/no-need-to-call-the-ethics-commissioner-on-this-ottawa-startup/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Glue Magazine (February 12, 2018)
            </a>
          </li>

          <li>
            <a
              href="https://issuu.com/kingstonheritage/docs/kingston_110817"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frontenac Gazette / Kingston Heritage (October 27, 2017)
            </a>
          </li>

          <li>
            <a
              href="https://thegreenpages.ca/2017/07/25/ethicaltree-hopes-to-connect-ethically-oriented-consumers-and-businesses/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Green Pages (July 25, 2017)
            </a>
          </li>

          <li>
            <a
              href="http://www.larotonde.ca/entreprises-ethiques-dottawa-a-portee-de-main/"
              target="_blank"
              rel="noopener noreferrer"
            >
              La Rotonde (July 4, 2017)
            </a>
          </li>

          <li>
            <a
              href="http://apt613.ca/ethicaltree/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apt 613 (May 23, 2017)
            </a>
          </li>

          <li>
            <a
              href="http://www.justchange.ca/april-2017-ethicaltree/"
              target="_blank"
              rel="noopener noreferrer"
            >
              JustChange (April 3, 2017)
            </a>
          </li>

          <li>
            <a
              href="http://thesustainabilitree.blogspot.ca/2017/03/impacts-impact-sustainability-for.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sustainabilitree Blog (March 29, 2017)
            </a>
          </li>

          <li>
            <a
              href="http://ottawa.impacthub.net/2017/02/21/impact-academy-2016-2017-meet-the-impacters/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ImpactHub Ottawa (February 21, 2017)
            </a>
          </li>

          <li>
            <a
              href="http://www.larotonde.ca/entrepreneuriat-a-uottawa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              La Rotonde (Sept 17, 2018)
            </a>
          </li>
        </ul>
      </Container>
    </div>
  )
}

export default AboutUs
