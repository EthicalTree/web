import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'

import {
  addImageToListing,
  deleteImageFromListing,
  getListing,
  makeImageCover
} from '../../actions/listing'

import EthicalityArea from './EthicalityArea'
import OperatingHours from './OperatingHours'
import ListingMap from './ListingMap'
import ListingMenu from './ListingMenu'

import Loader from '../Global/Loader'
import ImageManager from '../Global/ImageManager'
import { hasPermission } from '../../utils/permissions'

import './Listing.sass'

const TitleBar = (props) => {
  return (
    <div className="title-bar">
    </div>
  )
}

const AsideInfo = (props) => {
  const { dispatch, listing, className } = props

  return (
    <aside className={className}>
      <div className="hidden-sm-down">
        <EthicalityArea
          dispatch={dispatch}
          ethicalityChoices={listing.ethicalityChoices}
          ethicalities={listing.ethicalities}
          canEdit={hasPermission('update', listing)}
        />
      </div>

      <OperatingHours
        dispatch={dispatch}
        hours={listing.operatingHours}
        canEdit={hasPermission('update', listing)}
      />
    </aside>
  )
}

const Bio = (props) => {
  const { bio, canEdit } = props

  return (
    <div className="bio mb-5">
      <h3>
        {props.title}

        {canEdit && bio &&
          <a className="btn btn-sm btn-default ml-3" href="" onClick={props.onClickDescriptionEdit}>
            Edit
          </a>
        }
      </h3>

      {bio &&
        <p>{bio}</p>
      }

      {!bio &&
        <div className="no-content">
          {canEdit &&
            <a
              href=""
              onClick={props.onClickDescriptionEdit}
              className="btn btn-default"
            >
              Add a description
            </a>
          }
          {!canEdit &&
            <p>This listing has no desciption!</p>
          }
        </div>
      }
    </div>
  )
}

const ListingInfo = (props) => {
  const {
    listing,
    className,
    dispatch
  } = props

  const activeTab = listing.listingInfoTab
  const menu = listing.menus.length > 0 ? listing.menus[0] : null

  return (
    <div className={className}>
      <Bio
        onClickDescriptionEdit={props.onClickDescriptionEdit}
        title={listing.title}
        bio={listing.bio}
        canEdit={hasPermission('update', listing)}
      />

      <Nav tabs>
        <NavItem>
          <NavLink
            className={`${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => { dispatch({ type: 'CHANGE_LISTING_INFO_TAB', data: 'location' }) }}
          >
            Location
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => { dispatch({ type: 'CHANGE_LISTING_INFO_TAB', data: 'menu' }) }}
          >
            Menu
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="location">
          <ListingMap
            onClickLocationEdit={props.onClickLocationEdit}
            locations={listing.locations}
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

      <div className="clearfix"></div>
    </div>
  )
}

ListingInfo.propTypes = {
  listing: PropTypes.object,
  className: PropTypes.string,
  dispatch: PropTypes.func
}

const ListingContent = (props) => {
  const { listing, dispatch } = props

  return (
    <div className="row listing-content">

      <div className="col-12 hidden-md-up">
        <EthicalityArea
          dispatch={dispatch}
          ethicalityChoices={listing.ethicalityChoices}
          ethicalities={listing.ethicalities}
        />
      </div>

      <ListingInfo
        className="listing-info col-xl-9 col-lg-8 col-md-7"
        onClickDescriptionEdit={props.onClickDescriptionEdit}
        onClickLocationEdit={props.onClickLocationEdit}
        listing={listing}
        dispatch={dispatch}
      />

      <AsideInfo
        dispatch={dispatch}
        className="col-xl-3 col-lg-4 col-md-5"
        listing={listing}
      />
    </div>
  )
}

class Listing extends React.Component {

  componentDidMount() {
    const { dispatch, match } = this.props

    dispatch(getListing(match.params.slug))
  }

  onClickDescriptionEdit(e) {
    const { dispatch } = this.props

    e.preventDefault()
    dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_description' })
  }

  onClickLocationEdit(e) {
    const { dispatch } = this.props

    e.preventDefault()
    dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_location' })
  }

  render() {
    const { listing, dispatch } = this.props

    if (!listing.id && !listing.isListingLoading) {
      return (
        <div className="mt-5 text-center col">
          <h2>Whoops...</h2>
          <h5>Listing could not be found!</h5>
        </div>
      )
    }

    return (
      <Loader loading={listing.isListingLoading}>
        <Container>
          <div className="listing-detail">
            <ImageManager
              dispatch={dispatch}
              onImageUploadProgress={progress => dispatch({ type: 'SET_IMAGE_UPLOAD_PROGRESS', data: progress })}
              onSetCurrentImage={image => dispatch({ type: 'SET_LISTING_CURRENT_IMAGE', data: image })}
              images={listing.images}
              currentImage={listing.currentImage}
              isLoading={listing.isImageLoading}
              uploadProgress={listing.uploadProgress}
              canEdit={hasPermission('update', listing)}
              signingParams={{ slug: listing.slug }}
              coverAction={{
                handleAction: makeImageCover,
                title: 'Set Cover Photo',
                confirmMsg: 'Are you sure you want to make this photo your cover photo?',
                data: { listingSlug: listing.slug }
              }}
              deleteAction={{
                handleAction: deleteImageFromListing,
                title: 'Delete Photo',
                confirmMsg: 'Are you sure you want to delete this photo?',
                data: { listingSlug: listing.slug }
              }}
              addAction={{
                handleAction: image => dispatch(addImageToListing({
                  listingSlug: listing.slug,
                  imageKey: image.key
                })),
                title: 'Add Photo'
              }}
            />

            <TitleBar
              title={listing.title}
            />

            <ListingContent
              dispatch={dispatch}
              listing={listing}
              onClickDescriptionEdit={this.onClickDescriptionEdit.bind(this)}
              onClickLocationEdit={this.onClickLocationEdit.bind(this)}
            />
          </div>
        </Container>
      </Loader>
    )

  }
}

const select = (state) => {
  return {
    listing: state.listing
  }
}

export default connect(select)(Listing)
