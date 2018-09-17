import './Advertise.css'

import React from 'react'
import Wufoo from 'react-wufoo-embed'
import { Helmet } from 'react-helmet'
import { Col, Container, Jumbotron, Row } from 'reactstrap'

import { FeatureHighlight } from '../../../components/FeatureHighlight'
import { Testimonials } from '../../../components/Testimonials'

import magnifyUser from './images/magnify-user.svg'
import map from './images/map.svg'
import analytics from './images/analytics.svg'
import placement from './images/placement.svg'

export class Advertise extends React.Component {
  render() {
    return (
      <div className="advertise public-content">
        <Helmet>
          <title>{'For Business · EthicalTree'}</title>
        </Helmet>

        <Jumbotron>
          <h1>Grow Your Business Using EthicalTree</h1>
        </Jumbotron>

        <Container>
          <Row>
            <Col xs="12" md="6" className="benefit-section">
              <h4>Grow with EthicalTree</h4>
              <p>
                Conscious consumers are high-value customers who are willing to
                pay a premium for what they consider socially or environmentally
                responsible. With tens of thousands of users across Ontario,
                EthicalTree is one of the fastest growing social enterprise
                startups in Ontario.
              </p>
            </Col>

            <Col xs="12" md="6" className="benefit-section">
              <h4>Take full control of your business with free tools</h4>
              <p>
                Free tools to boost your business’ revenue is a no-brainer! Once
                you claim your business for free and add more content, you’ll
                expand your reach and attract more customers instantly.
              </p>
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="6" className="benefit-section">
              <h4>Experts in bringing you more customers</h4>
              <p>
                When you sign up with EthicalTree, you not only reach thousands
                of consumers that care about local businesses like yours, but
                you also get our experts that will update and optimize your
                business page to attract even more customers.
              </p>
            </Col>

            <Col xs="12" md="6" className="benefit-section">
              <h4>Convert EthicalTree users into your loyal customers</h4>
              <p>
                Most EthicalTree users are mobile locals looking for their next
                place to go. Bring them to your doors by standing out from your
                competition and make them regular visitors.
              </p>
            </Col>
          </Row>

          <hr />

          <div className="upgrade-incentive">
            <h2 className="text-center">Want An Even Bigger Boost?</h2>

            <Row>
              <Col xs="12">
                <FeatureHighlight
                  renderGraphic={() => <img alt="" src={magnifyUser} />}
                  renderContent={() => (
                    <React.Fragment>
                      <h4>Highly Targeted Advertising</h4>
                      <p>
                        Promote your business to targeted consumers who care
                        about supporting local businesses that align with their
                        values. Consumers who align with your brand’s values are
                        proven to become more loyal, long-term customers.
                      </p>
                    </React.Fragment>
                  )}
                />
              </Col>
            </Row>

            <Row>
              <Col xs="12">
                <FeatureHighlight
                  alternate
                  renderGraphic={() => <img alt="" src={map} />}
                  renderContent={() => (
                    <React.Fragment>
                      <h4>Get Discovered By New Loyal Customers</h4>
                      <p>
                        Drive more revenue for your business by reaching
                        EthicalTree users. We find you customers that are most
                        likely to engage with your business and return time and
                        time again.
                      </p>
                    </React.Fragment>
                  )}
                />
              </Col>
            </Row>

            <Row>
              <Col xs="12">
                <FeatureHighlight
                  renderGraphic={() => <img alt="" src={placement} />}
                  renderContent={() => (
                    <React.Fragment>
                      <h4>Priority Placement</h4>
                      <p>
                        Stand out among your competition by displaying your
                        business as one of the first few in search results,
                        featured collection pages, and on your competitors'
                        business pages.
                      </p>
                    </React.Fragment>
                  )}
                />
              </Col>
            </Row>

            <Row>
              <Col xs="12">
                <FeatureHighlight
                  alternate
                  renderGraphic={() => <img alt="" src={analytics} />}
                  renderContent={() => (
                    <React.Fragment>
                      <h4>Access Analytics To Track Performance</h4>
                      <p>
                        Gain access to detailed monthly analytics reports to
                        track the performance of your business page. Discover
                        new insights with data on the demographics and interests
                        of users most likely to click on your ads and visit your
                        page.
                      </p>
                    </React.Fragment>
                  )}
                />
              </Col>
            </Row>
          </div>
        </Container>

        <div className="p-4" />

        <Testimonials />

        <Container>
          <h3>
            Leave us your contact info and we’ll get in touch to set up your
            free account within 24 hours!
          </h3>

          <Wufoo
            userName="ethicaltree"
            formHash="w1t4xiny191sh0c"
            header="hide"
          />
        </Container>
      </div>
    )
  }
}

export default Advertise
