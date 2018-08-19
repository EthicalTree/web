import './Listing.css'

import React from 'react'
import querystring from 'querystring'
import { Redirect } from 'react-router'
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
import { editListing } from '../../actions/listing'

class Listing extends React.Component {
  onTagAdd = value => {
    const { dispatch, listing } = this.props
    dispatch(addTagToListing(listing.slug, value))
  }

  onTagRemove = id => {
    const { dispatch, listing } = this.props
    dispatch(removeTagFromListing(listing.slug, id))
  }

  handleReposition = reposition => {
    const { dispatch, listing } = this.props
    const { currentImage } = listing

    if (!reposition) {
      return
    }

    const originalY = currentImage.coverOffsetY || 0
    const diffY = reposition ? reposition.diffY : 0

    dispatch(
      updateListingImage({
        listingSlug: listing.slug,
        imageId: currentImage.id,
        data: { offsetY: originalY + diffY },
      })
    )
  }

  getClaimParams = () => {
    const { location } = this.props
    const queryParams = querystring.parse(location.search.slice(1))

    return {
      claim: queryParams.claim === 'true',
      claimId: queryParams.claimId,
    }
  }

  componentDidMount() {
    const { dispatch, match, session } = this.props
    const { claim, claimId } = this.getClaimParams()
    const listingSlug = match.params.slug

    dispatch(getListing(listingSlug))

    if (claim) {
      if (session.user) {
        dispatch(
          editListing({
            slug: listingSlug,
            claim: true,
            claimId,
          })
        )
      } else {
        dispatch(openClaimListingSignup(listingSlug, claimId))
      }
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
    const { dispatch, listing, location, match } = this.props

    const { claim } = this.getClaimParams()
    const { currentImage } = listing

    const title =
      listing.address && listing.city
        ? `${listing.title} in ${toTitleCase(listing.city)} · ${
            listing.address
          } · EthicalTree`
        : `${listing.title} · EthicalTree`

    if (!listing.id && !listing.isListingLoading) {
      return (
        <div className="mt-5 text-center col">
          <h2>Whoops...</h2>
          <h5>Listing could not be found!</h5>
        </div>
      )
    }

    if (claim && listing.claimStatus === 'claimed') {
      return <Redirect to={location.pathname} />
    }

    return (
      <Loader
        key={match.params.slug}
        loading={listing.isListingLoading}
        fixed={true}>
        <Helmet key={listing.id}>
          <title>{title}</title>
          <meta name="description" content={`${listing.bio}`} />
        </Helmet>

        <Container>
          <div className="listing-detail">
            <ImageManager
              className="listing-image-manager"
              currentImage={currentImage}
              onImageUploadProgress={progress =>
                dispatch({ type: 'SET_IMAGE_UPLOAD_PROGRESS', data: progress })
              }
              onSetCurrentImage={image =>
                dispatch({ type: 'SET_LISTING_CURRENT_IMAGE', data: image })
              }
              images={listing.images}
              imgStyle={{ maxHeight: null }}
              isLoading={listing.isImageLoading}
              uploadProgress={listing.uploadProgress}
              addText="Add a photo"
              emptyText="No photos added"
              canEdit={hasPermission('update', listing)}
              signingParams={{ type: 'listing', slug: listing.slug }}
              repositionImages={true}
              coverAction={{
                handleAction: () => dispatch(makeImageCover({ listingSlug: listing.slug, imageId: currentImage.id })),
                title: 'Set as cover photo',
              }}
              shiftPreviousAction={{
                handleAction: () => dispatch(updateListingImage({
                  listingSlug: listing.slug,
                  imageId: currentImage.id,
                  data: { shift: 'previous' }
                })),
                title: 'Switch places with the previous photo',
              }}
              shiftNextAction={{
                handleAction: () => dispatch(updateListingImage({
                  listingSlug: listing.slug,
                  imageId: currentImage.id,
                  data: { shift: 'next' }
                })),
                title: 'Switch places with the next photo',
              }}
              fullScreenAction={{
                handleAction: () => {
                  dispatch({
                    type: 'SET_FULLSCREEN_MODAL_IMAGES',
                    data: [...listing.images],
                  })
                  dispatch({
                    type: 'SET_FULLSCREEN_MODAL_CURRENT_IMAGE',
                    data: currentImage,
                  })
                  dispatch({ type: 'OPEN_MODAL', data: 'fullscreen-image' })
                },
                title: 'Enlarge current photo',
              }}
              deleteAction={{
                handleAction: () =>
                  dispatch(
                    setConfirm({
                      title: 'Delete Photo',
                      msg: 'Are you sure you want to delete this photo?',
                      action: deleteImageFromListing,
                      data: {
                        listingSlug: listing.slug,
                        imageId: currentImage.id,
                      },
                    })
                  ),
                title: 'Delete current photo',
              }}
              addAction={{
                handleAction: image =>
                  dispatch(
                    addImageToListing({
                      listingSlug: listing.slug,
                      imageKey: image.key,
                    })
                  ),
                title: 'Add a new photo',
              }}
              handleReposition={this.handleReposition}
            />

            <div className="title-bar" />

            {isAdmin() && (
              <TagBar
                tags={listing.tags}
                onTagAdd={this.onTagAdd}
                onTagRemove={this.onTagRemove}
              />
            )}

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
  user: state.user,
})

export default connect(select)(Listing)
