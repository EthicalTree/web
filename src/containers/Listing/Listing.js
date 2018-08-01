import './Listing.css'

import React from 'react'
import querystring from 'querystring'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'

import {
  addImageToListing,
  deleteImageFromListing,
  getListing,
  makeImageCover,
  updateListingImage,
  addTagToListing,
  removeTagFromListing
} from '../../actions/listing'

import { TagBar } from '../../components/Listing/TagBar'
import { ListingContent } from '../../components/Listing/ListingContent'

import { Loader } from '../../components/Loader'
import { ImageManager } from '../../components/ImageManager'

import { hasPermission, isAdmin } from '../../utils/permissions'
import { toTitleCase } from '../../utils/string'

import { setConfirm } from '../../actions/confirm'
import { openClaimListingSignup } from '../../actions/session'

class Listing extends React.Component {

  onTagAdd = value => {
    const { dispatch, listing } = this.props
    dispatch(addTagToListing(listing.slug, value))
  }

  onTagRemove = id => {
    const { dispatch, listing } = this.props
    dispatch(removeTagFromListing(listing.slug, id))
  }

  handleReposition = (reposition) => {
    const { dispatch, listing } = this.props
    const { currentImage } = listing

    if (!reposition) {
      return
    }

    const originalY = currentImage.coverOffsetY || 0
    const diffY = reposition ? reposition.diffY : 0

    dispatch(updateListingImage({
      listingSlug: listing.slug,
      imageId: currentImage.id,
      offset: { y: originalY + diffY }
    }))
  }

  componentDidMount() {
    const { dispatch, location, match, session } = this.props
    const queryParams = querystring.parse(location.search.slice(1))
    const listingSlug = match.params.slug

    dispatch(getListing(listingSlug))

    if (queryParams.claim === 'true' && !session.user) {
      dispatch(openClaimListingSignup(listingSlug, queryParams.claimId))
    }
  }

  componentWillReceiveProps(newProps) {
    const { match, dispatch } = this.props

    const slugChanged = newProps.match.params.slug !== match.params.slug
    const cityChanged = newProps.match.params.city !== match.params.city

    if (slugChanged || cityChanged) {
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
    const {
      dispatch,
      listing,
      match
    } = this.props

    const { currentImage } = listing
    const title = listing.address && listing.city ? (
      `${listing.title} in ${toTitleCase(listing.city)} · ${listing.address} · EthicalTree`
    ) : (
      `${listing.title} · EthicalTree`
    )

    if (!listing.id && !listing.isListingLoading) {
      return (
        <div className="mt-5 text-center col">
          <h2>Whoops...</h2>
          <h5>Listing could not be found!</h5>
        </div>
      )
    }

    return (
      <Loader
        key={match.params.slug}
        loading={listing.isListingLoading}
        fixed={true}
      >
        <Helmet key={listing.id}>
          <title>{title}</title>
          <meta
            name="description"
            content={`${listing.bio}`}
          />
        </Helmet>

        <Container>
          <div className="listing-detail">
            <ImageManager
              className="listing-image-manager"
              onImageUploadProgress={progress => dispatch({ type: 'SET_IMAGE_UPLOAD_PROGRESS', data: progress })}
              onSetCurrentImage={image => dispatch({ type: 'SET_LISTING_CURRENT_IMAGE', data: image })}
              images={listing.images}
              imgStyle={{ maxHeight: null }}
              isLoading={listing.isImageLoading}
              uploadProgress={listing.uploadProgress}
              addText="Add a photo"
              emptyText="No photos added"
              canEdit={hasPermission('update', listing)}
              signingParams={{ type: 'listing', slug: listing.slug }}
              repositionImages={true}
              fullScreenAction={{
                handleAction: () => {
                  dispatch({ type: 'SET_FULLSCREEN_MODAL_IMAGES', data: [...listing.images] })
                  dispatch({ type: 'SET_FULLSCREEN_MODAL_CURRENT_IMAGE', data: currentImage })
                  dispatch({ type: 'OPEN_MODAL', data: 'fullscreen-image' })
                },
                title: 'Enlarge Photo',
              }}
              coverAction={{
                handleAction: () => dispatch(setConfirm({
                  title: 'Set Cover Photo',
                  msg: 'Are you sure you want to make this photo your cover photo?',
                  action: makeImageCover,
                  data: {listingSlug: listing.slug, imageId: currentImage.id}
                })),
                title: 'Set Cover Photo'
              }}
              deleteAction={{
                handleAction: () => dispatch(setConfirm({
                  title: 'Delete Photo',
                  msg: 'Are you sure you want to delete this photo?',
                  action: deleteImageFromListing,
                  data: {listingSlug: listing.slug, imageId: currentImage.id}
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
              handleReposition={this.handleReposition}
            />

            <div className="title-bar" />

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

const select = state => ({
  listing: state.listing,
  session: state.session,
  user: state.user
})

export default connect(select)(Listing)
