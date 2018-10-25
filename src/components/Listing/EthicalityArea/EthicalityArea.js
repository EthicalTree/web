import React from 'react'
import { Button, Card, CardBody } from 'reactstrap'

import { Ethicality } from '../../Ethicality/Ethicality'
import { EthicalityAreaSkeleton } from './EthicalityAreaSkeleton'

import { genDummyList } from '../../../utils/skeleton'

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
  const noEthicalities = ethicalities && ethicalities.length < 1

  return (
    <Card className={`ethicality ${className}`}>
      <CardBody className="ethicalities d-flex justify-content-center d-lg-block">
        {noEthicalities && <p>No ethicalities set!</p>}

        {hasEthicalities &&
          ethicalities.map((ethicality, i) => {
            return (
              <Ethicality
                key={i}
                className="p-3"
                name={ethicality.name}
                slug={ethicality.slug}
                iconKey={ethicality.iconKey}
              />
            )
          })}

        {ethicalities == null &&
          genDummyList(2).map((x, i) => <EthicalityAreaSkeleton key={i} />)}

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
