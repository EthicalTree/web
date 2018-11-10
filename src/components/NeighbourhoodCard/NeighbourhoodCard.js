import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'reactstrap'

import './NeighbourhoodCard.css'

const NeighbourhoodCard = ({ city, neighbourhoods }) => {
  if (neighbourhoods.length < 1) {
    return null
  }
  return (
    <div className="neighbourhood-card">
      <h3 className="neighbourhood-card__title">{`Find places in and around ${city}`}</h3>
      <Card className="neighbourhood-card__card">
        <Row>
          {neighbourhoods.map(neighbourhood => (
            <Col key={neighbourhood.id} xs={12} sm={4}>
              <Link to={`/s/?location=${neighbourhood.name}`}>
                <span className="neighbourhood-card__name">
                  {`${neighbourhood.name} `}
                </span>
                <span className="neighbourhood-card__places">
                  ({neighbourhood.listingsCount} places)
                </span>
              </Link>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  )
}

NeighbourhoodCard.defaultProps = {
  neighbourhoods: [],
}

NeighbourhoodCard.propTypes = {
  city: PropTypes.string.isRequired,
  neighbourhoods: PropTypes.array,
}

export default NeighbourhoodCard
