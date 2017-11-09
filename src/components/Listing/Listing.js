import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

import {
  getListing,
  addImageToListing,
} from '../../actions/listing'

import ListingImages from './ListingImages'
import EthicalityArea from './EthicalityArea'
import OperatingHours from './OperatingHours'
import ListingMap from './ListingMap'

import Loader from '../Global/Loader'
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
    <div className="bio">
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
  const { listing, className, dispatch } = props

  return (
    <div className={className}>
      <Bio
        onClickDescriptionEdit={props.onClickDescriptionEdit}
        title={listing.title}
        bio={listing.bio}
        canEdit={hasPermission('update', listing)}
      />

      <ListingMap
        onClickLocationEdit={props.onClickLocationEdit}
        locations={listing.locations}
        canEdit={hasPermission('update', listing)}
        dispatch={dispatch}
      />

      <div className="clearfix"></div>
    </div>
  )
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

  onImageUploadProgress(progress) {
    this.props.dispatch({ type: 'SET_IMAGE_UPLOAD_PROGRESS', data: progress })
  }

  onImageUploadFinish(image) {
    const { listing, dispatch } = this.props

    dispatch(addImageToListing(listing.slug, image.key))
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
            <ListingImages
              dispatch={this.props.dispatch}
              onImageUploadProgress={this.onImageUploadProgress.bind(this)}
              onImageUploadFinish={this.onImageUploadFinish.bind(this)}
              images={listing.images}
              slug={listing.slug}
              currentImage={listing.currentImage}
              isLoading={listing.isImageLoading}
              uploadProgress={listing.uploadProgress}
              canEdit={hasPermission('update', listing)}
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
