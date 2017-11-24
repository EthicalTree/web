import React from 'react'
import { Button, Card, CardBody } from 'reactstrap'

import { Ethicality } from '../Ethicality/Ethicality'

const AddEthicalityButton = props => {
  const { hasEthicalities, dispatch } = props

  if (hasEthicalities) {
    return (
      <Button
        block
        size="sm"
        color="default"
        onClick={() => dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_ethicalities' })}>
        Edit
      </Button>
    )
  }

  return (
    <Button
      block
      color="default"
      onClick={() => dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_ethicalities' })}
    >
      Add
    </Button>
  )
}

const EthicalityArea = (props) => {
  const { dispatch, ethicalities, className, canEdit } = props
  const hasEthicalities = ethicalities && ethicalities.length > 0

  return (
    <Card className={`ethicality ${className}`}>
      <CardBody
        className="ethicalities d-flex justify-content-center d-md-block"
      >
        {canEdit &&
          <AddEthicalityButton
            dispatch={dispatch}
            hasEthicalities={hasEthicalities}
          />
        }

        {hasEthicalities && ethicalities.map(ethicality => {
          return (
            <Ethicality
              key={ethicality.slug}
              className="p-3"
              name={ethicality.name}
              slug={ethicality.slug}
              iconKey={ethicality.iconKey}
            />
          )
        })}

        {!hasEthicalities &&
          <div className="no-content">
            <p>No ethicalities set!</p>
          </div>
        }
      </CardBody>
    </Card>
  )
}

export default EthicalityArea
