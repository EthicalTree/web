import React from 'react'

import { EthicalityArea } from '../EthicalityArea'
import { ListingInfo } from '../ListingInfo'
import { OperatingHours } from '../OperatingHours'

import { hasPermission } from '../../../utils/permissions'

const ListingContent = props => {
  const { listing, dispatch } = props

  return (
    <div className="row listing-content">
      <div className="mobile-ethicalities col-12 d-lg-none">
        <EthicalityArea
          dispatch={dispatch}
          ethicalityChoices={listing.ethicalityChoices}
          ethicalities={listing.ethicalities}
        />
      </div>

      <ListingInfo
        className="listing-info col-xl-9 col-lg-8"
        onClickDescriptionEdit={props.onClickDescriptionEdit}
        onClickLocationEdit={props.onClickLocationEdit}
        listing={listing}
        dispatch={dispatch}
      />

      <aside className="col-xl-3 col-lg-4 d-none d-lg-block">
        <EthicalityArea
          dispatch={dispatch}
          ethicalityChoices={listing.ethicalityChoices}
          ethicalities={listing.ethicalities}
          canEdit={hasPermission('update', listing)}
        />

        <OperatingHours
          canEdit={hasPermission('update', listing)}
          dispatch={dispatch}
          hours={listing.operatingHours}
          timezone={listing.timezone}
        />
      </aside>
    </div>
  )
}

export default ListingContent
