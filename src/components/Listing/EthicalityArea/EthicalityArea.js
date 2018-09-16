import React from 'react'
import { Button, Card, CardBody } from 'reactstrap'

import { Ethicality } from '../../Ethicality/Ethicality'

const AddEthicalityButton = props => {
  const { hasEthicalities, dispatch } = props

  if (hasEthicalities) {
    return (
      <Button
        block
        size="sm"
        color="default"
        onClick={() =>
          dispatch({ type: 'OPEN_MODAL', data: 'edit-ethicalities' })
        }
      >
        Edit
      </Button>
    )
  }

  return (
    <Button
      block
      color="default"
      onClick={() =>
        dispatch({ type: 'OPEN_MODAL', data: 'edit-ethicalities' })
      }
    >
      Add
    </Button>
  )
}

const EthicalityArea = props => {
  const { dispatch, ethicalities, className, canEdit } = props
  const hasEthicalities = ethicalities && ethicalities.length > 0

  return (
    <Card className={`ethicality ${className}`}>
      <CardBody className="ethicalities d-flex justify-content-center d-lg-block">
        {!hasEthicalities && <p>No ethicalities set!</p>}

        {hasEthicalities &&
          ethicalities.map(ethicality => {
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

        {canEdit && (
          <AddEthicalityButton
            dispatch={dispatch}
            hasEthicalities={hasEthicalities}
          />
        )}
      </CardBody>
    </Card>
  )
}

export default EthicalityArea
