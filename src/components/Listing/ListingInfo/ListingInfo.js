import React from 'react'
import PropTypes from 'prop-types'

import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

import { Bio } from '../Bio'
import { ListingMap } from '../ListingMap'
import { ListingMenu } from '../ListingMenu'
import { Featured } from '../Featured'

import { trackEvent } from '../../../utils/ga'
import { hasPermission } from '../../../utils/permissions'

const ListingInfo = props => {
  const { listing, className, dispatch } = props

  const activeTab = listing.listingInfoTab
  const menu = listing.menus.length > 0 ? listing.menus[0] : null
  const isStore = listing.categories.map(c => c.slug).includes('store')

  return (
    <div className={className}>
      <Bio
        bio={listing.bio}
        canEdit={hasPermission('update', listing)}
        onClickDescriptionEdit={props.onClickDescriptionEdit}
        phone={listing.phone}
        title={listing.title}
        website={listing.website}
      />

      <Nav tabs>
        <NavItem>
          <NavLink
            className={`${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => {
              trackEvent({
                action: 'Select Location Tab',
                category: 'Listing',
                label: listing.slug,
              })

              dispatch({ type: 'CHANGE_LISTING_INFO_TAB', data: 'location' })
            }}
          >
            Location
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => {
              trackEvent({
                action: 'Select Menu Tab',
                category: 'Listing',
                label: listing.slug,
              })

              dispatch({ type: 'CHANGE_LISTING_INFO_TAB', data: 'menu' })
            }}
          >
            {isStore && 'More Info'}
            {!isStore && 'Menu'}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="location">
          <ListingMap
            onClickLocationEdit={props.onClickLocationEdit}
            location={listing.location}
            canEdit={hasPermission('update', listing)}
            dispatch={dispatch}
          />
        </TabPane>

        <TabPane tabId="menu">
          <ListingMenu
            dispatch={dispatch}
            menu={menu}
            listingSlug={listing.slug}
            currentImage={listing.currentMenuImage}
            canEdit={hasPermission('update', listing)}
          />
        </TabPane>
      </TabContent>

      <div className="clearfix" />

      {!listing.plan && <Featured />}
    </div>
  )
}

ListingInfo.propTypes = {
  listing: PropTypes.object,
  className: PropTypes.string,
  dispatch: PropTypes.func,
}

export default ListingInfo
