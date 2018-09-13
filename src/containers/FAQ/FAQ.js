import './FAQ.css'

import React from 'react'
import { Container } from 'reactstrap'
import { Helmet } from 'react-helmet'

export const FAQ = () => {
  return (
    <div className="faq">
      <Helmet>
        <title>{'FAQ · EthicalTree'}</title>
        <meta
          name="description"
          content={'EthicalTree Frequently Asked Questions'}
        />
      </Helmet>

      <Container>
        <h1 className="mt-5 mb-5">Frequently Asked Questions</h1>

        <p>
          <b>Q:</b> <i>Why did you choose these ethical preferences?</i>
        </p>
        <p>
          <b>A: </b>
          While we plan to eventually have search features for many ethical
          preferences, we started with these ones as we found that there were
          large communities that we can work with to verify accurate
          information. We have a long list of ethical preferences to add in the
          future, but feel free to send us feedback for what you’d like to see
          next!
        </p>

        <hr />

        <p>
          <b>Q:</b>{' '}
          <i>
            What are the criteria for businesses listed as vegan or vegetarian?
          </i>
        </p>
        <p>
          <b>A: </b>
          Every business listed under these preferences have at least one solid
          vegan or vegetarian option, respective to the preference selected. Any
          vegan business will also be included in searches for vegetarian
          businesses. Contact us or leave feedback on the listing page if you
          think a business should be removed as vegan or vegetarian friendly.
          Restaurants change their menus all the time, and we count on feedback
          from our users to make adjustments as quickly as possible so no one
          else has a similar bad experience.
        </p>

        <hr />

        <p>
          <b>Q:</b>{' '}
          <i>Why is “Woman-Owned-Business” listed as an ethical preference?</i>
        </p>
        <p>
          <b>A: </b>
          Women-owned businesses are included because women face increased
          barriers to entrepreneurship compared to men, so many people try to
          support women in entrepreneurship to help level the playing field.
          Businesses listed as “woman-owned” are at least 50% owned by someone
          who does not identify as a man.
        </p>

        <hr />

        <p>
          <b>Q:</b> <i>What is “fair trade”?</i>
        </p>
        <p>
          <b>A: </b>
          Fair trade certified products guarantee that farmers and other
          producers are treated fairly and paid a fair wage for their labour.
          EthicalTree uses the same definitions for “fair trade” as our
          community partner Fair Trade Ottawa Équitable (FTOÉ), which requires
          fair trade products to be certified and labeled by an acceptable third
          party. Visit FTOÉ’s online FAQs more information on fair trade
          certification.
        </p>

        <p>
          While “Direct Trade” can also often be beneficial to producers from
          developing countries, we do not include it as an ethical preference on
          EthicalTree because there are no means of certifying or proving that a
          “Direct Trade” business treats its producers in a fair way – it simply
          means that they have a direct relationship with the producer.
        </p>

        <hr />

        <p>
          <b>Q:</b> <i>Who is behind EthicalTree?</i>
        </p>
        <p>
          <b>A: </b>
          Siavash and Frank were both very passionate about ethical consumerism
          and empowering consumers to vote with their dollars. While studying
          together at the University of Ottawa, they both were frustrated at how
          difficult it was to find businesses that were vegetarian or Fair
          Trade. They decided to launch EthicalTree.com as a free service to
          make it easier for consumers to find ethical businesses and they
          quickly realized that many others shared the same frustrations and
          needed a better platform for ethical consumerism. Kelsea, another
          passionate ethical consumer and entrepreneur, quickly joined the team
          on their mission to grow ethical consumerism in North America, and
          beyond.
        </p>

        <p>
          Today, EthicalTree is operated by Willy, Siavash, and Frank. Willy
          joined the team in late 2016 as the technology lead and has been hard
          at work improving the EthicalTree platform and preparing for the
          development of mobile apps in the near future.
        </p>

        <h4 className="mt-5 mb-3">Got a question?</h4>

        <p>
          Please email us at{' '}
          <a href="mailto:info@ethicaltree.com">info@ethicaltree.com</a>
        </p>

        <p className="mb-5">We always respond to your feedback!</p>
      </Container>
    </div>
  )
}

export default FAQ
