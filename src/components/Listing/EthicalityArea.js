import React from 'react'
import { Button } from 'reactstrap'

import { Ethicality } from '../Ethicality/Ethicality'

const EthicalityArea = (props) => {
  const { dispatch, ethicalities, className, canEdit } = props
  const hasEthicalities = ethicalities && ethicalities.length > 0

  return (
    <div className={`card ethicality ${className}`}>
      <div className="card-block ethicalities">
        {hasEthicalities &&
          <div>
            {canEdit &&
              <Button
                block
                size="sm"
                color="default"
                onClick={() => dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_ethicalities' })}>
                Edit
              </Button>
            }

            {ethicalities.map(ethicality => {
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
          </div>
        }

        {!hasEthicalities &&
          <div className="no-content">
            <p>No ethicalities set!</p>
            {canEdit &&
              <Button
                block
                color="default"
                onClick={() => dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_ethicalities' })}
              >
                Add
              </Button>
            }

          </div>
        }
      </div>
    </div>
  )
}

export default EthicalityArea
