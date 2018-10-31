import React from 'react'
import PropTypes from 'prop-types'

import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

import { Bio } from '../Bio'
import { ListingMap, ListingMapSkeleton } from '../ListingMap'
import { ListingMenu, ListingMenuSkeleton } from '../ListingMenu'
import { Featured } from '../Featured'

import { trackEvent } from '../../../utils/ga'
import { hasPermission } from '../../../utils/permissions'

import { BioSkeleton } from '../Bio'

const ListingInfo = props => {
  const {
    listing,
    className,
    dispatch,
    onClickLocationEdit,
    onClickDescriptionEdit,
  } = props

  const activeTab = listing.listingInfoTab
  const menu = listing.menus.length > 0 ? listing.menus[0] : null
  const isStore =
    listing.categories && listing.categories.map(c => c.slug).includes('store')

  return (
    <div className={className}>
      {listing.isListingLoading ? (
        <BioSkeleton />
      ) : (
        <Bio
          bio={listing.bio}
          canEdit={hasPermission('update', listing)}
          onClickDescriptionEdit={onClickDescriptionEdit}
          phone={listing.phone}
          title={listing.title}
          website={listing.website}
        />
      )}

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
          {listing.isListingLoading && <ListingMapSkeleton />}
          {!listing.isListingLoading && (
            <ListingMap
              onClickLocationEdit={onClickLocationEdit}
              location={listing.location}
              canEdit={hasPermission('update', listing)}
              dispatch={dispatch}
            />
          )}
        </TabPane>

        <TabPane tabId="menu">
          {listing.isListingLoading && <ListingMenuSkeleton />}
          {!listing.isListingLoading && (
            <ListingMenu
              dispatch={dispatch}
              menu={menu}
              listingSlug={listing.slug}
              currentImage={listing.currentMenuImage}
              canEdit={hasPermission('update', listing)}
            />
          )}
        </TabPane>
      </TabContent>

      <div className="clearfix" />

      {!listing.plan && <Featured location={listing.location} />}
    </div>
  )
}

ListingInfo.propTypes = {
  listing: PropTypes.object,
  className: PropTypes.string,
  dispatch: PropTypes.func,
}

export default ListingInfo
