import './Listing.css'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Col
} from 'reactstrap'

import {
  addImageToListing,
  deleteImageFromListing,
  getListing,
  makeImageCover,
  addTagToListing,
  removeTagFromListing
} from '../../actions/listing'

import EthicalityArea from './EthicalityArea'
import OperatingHours from './OperatingHours'
import ListingMap from './ListingMap'
import ListingMenu from './ListingMenu'

import { EthicalityBar } from '../Ethicality/Ethicality'
import { Featured } from './Featured'
import { Icon } from '../Icon'
import { TagBar } from './TagBar'
import { Loader } from '../Loader'
import ImageManager from '../Global/ImageManager'

import { hasPermission, isAdmin } from '../../utils/permissions'

import { setConfirm } from '../../actions/confirm'
import { toggleSearchEthicalities } from '../../actions/search'

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
      <div className="d-none d-md-block">
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
  const { bio, canEdit, title, website } = props

  return (
    <div className="bio mb-5">
      <div className="listing-title">
        <h3>
          {title}

          {canEdit && bio &&
            <a className="btn btn-sm btn-default ml-3" href="" onClick={props.onClickDescriptionEdit}>
              Edit
            </a>
          }
        </h3>

        {website &&
          <a
            href={website}
            rel="noopener noreferrer"
            target="_blank"
            className="external-link"
          >
            Website
            <Icon iconKey="extract" />
          </a>
        }
      </div>

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
        website={listing.website}
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

      <Featured featuredListings={listing.featuredListings} />
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
      <div className="mobile-ethicalities col-12 d-md-none">
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

  onTagAdd = value => {
    const { dispatch, listing } = this.props
    dispatch(addTagToListing(listing.slug, value))
  }

  onTagRemove = id => {
    const { dispatch, listing } = this.props
    dispatch(removeTagFromListing(listing.slug, id))
  }

  componentDidMount() {
    const { dispatch, match } = this.props

    dispatch(getListing(match.params.slug))
  }

  componentWillReceiveProps(newProps) {
    const { match, dispatch } = this.props

    if (newProps.match.params.slug !== match.params.slug) {
      dispatch(getListing(newProps.match.params.slug))
    }
  }

  onClickDescriptionEdit(e) {
    const { dispatch } = this.props

    e.preventDefault()
    dispatch({ type: 'OPEN_MODAL', data: 'edit-description' })
  }

  onClickLocationEdit(e) {
    const { dispatch } = this.props

    e.preventDefault()
    dispatch({ type: 'OPEN_MODAL', data: 'edit-location' })
  }

  render() {
    const { listing, app, search, dispatch } = this.props

    if (listing.title) {
      document.title = `EthicalTree · ${listing.title}`
    }

    const ethicalities = app.ethicalities
    const selectedEthicalities = search.selectedEthicalities

    if (!listing.id && !listing.isListingLoading) {
      return (
        <div className="mt-5 text-center col">
          <h2>Whoops...</h2>
          <h5>Listing could not be found!</h5>
        </div>
      )
    }

    return (
      <Loader key={listing.slug} loading={listing.isListingLoading}>
        <Col className="ethicality-bar pt-2 pb-2">
          <EthicalityBar
            className=""
            showLabels={true}
            showTooltips={false}
            showIcons={true}
            ethicalities={ethicalities}
            onEthicalitySelect={slug => {
              dispatch({
                type: 'SET_SEARCH_ETHICALITIES',
                data: toggleSearchEthicalities(selectedEthicalities, slug)
              })
            }}
            selectedEthicalities={selectedEthicalities}
          />
        </Col>
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
              addText="Add a photo"
              emptyText="No photos added"
              canEdit={hasPermission('update', listing)}
              signingParams={{ slug: listing.slug }}
              locationKey="listing-images"
              fullScreenAction={{
                handleAction: image => {
                  dispatch({ type: 'SET_FULLSCREEN_MODAL_IMAGES', data: [...listing.images] })
                  dispatch({ type: 'SET_FULLSCREEN_MODAL_CURRENT_IMAGE', data: image })
                  dispatch({ type: 'OPEN_MODAL', data: 'fullscreen-image' })
                },
                title: 'Enlarge Photo',
              }}
              coverAction={{
                handleAction: image => dispatch(setConfirm({
                  title: 'Set Cover Photo',
                  msg: 'Are you sure you want to make this photo your cover photo?',
                  action: makeImageCover,
                  data: {listingSlug: listing.slug, imageId: image.id}
                })),
                title: 'Set Cover Photo'
              }}
              deleteAction={{
                handleAction: image => dispatch(setConfirm({
                  title: 'Delete Photo',
                  msg: 'Are you sure you want to delete this photo?',
                  action: deleteImageFromListing,
                  data: {listingSlug: listing.slug, imageId: image.id}
                })),
                title: 'Delete Photo'
              }}
              addAction={{
                handleAction: image => dispatch(addImageToListing({
                  listingSlug: listing.slug,
                  imageKey: image.key
                })),
                title: 'Add Photo'
              }}
            />

            <TitleBar />

            {isAdmin() &&
              <TagBar
                tags={listing.tags}
                onTagAdd={this.onTagAdd}
                onTagRemove={this.onTagRemove}
              />
            }

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
    listing: state.listing,
    app: state.app,
    search: state.search
  }
}

export default connect(select)(Listing)
