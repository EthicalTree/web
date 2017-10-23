import React from 'react'
import { connect } from 'react-redux'
import { Marker } from 'react-google-maps'

import {
  Container,
  Button,
  UncontrolledTooltip as Tooltip
} from 'reactstrap'

import {
  getListing,
  addImageToListing,
  makeImageCover,
  deleteImageFromListing
} from '../../actions/listing'

import { setConfirm } from '../../actions/confirm'

import Loader from '../Global/Loader'
import ETSlider from '../Global/Slider'
import S3Uploader from '../Global/S3'
import Map from '../Global/Map'
import { Ethicality } from '../Ethicality/Ethicality'
import { hasPermission } from '../../utils/permissions'

import './Listing.sass'

const ImageActions = (props) => {
  const { dispatch, slug, currentImage } = props

  return (
    <div>
      <div className="actions">
        <div><div className="triangle"></div></div>
        <i
          id="makeCoverPhoto"
          title="Make cover photo"
          role="button"
          tabIndex="0"
          onClick={() => dispatch(setConfirm({
            title: 'Set Cover Photo',
            msg: 'Are you sure you want to make this photo your cover photo?',
            action: makeImageCover,
            data: {
              listingSlug: slug,
              image_id: currentImage.id
            }
          }))}
          className="icon-button fa fa-file-picture-o" />
        <Tooltip placement="bottom" target="makeCoverPhoto" delay={0}>Make cover photo</Tooltip>

        <i
          id="deleteImage"
          title="Delete photo"
          role="button"
          tabIndex="0"
          onClick={() => dispatch(setConfirm({
            title: 'Delete Photo',
            msg: 'Are you sure you want to delete this photo?',
            action: deleteImageFromListing,
            data: {
              listingSlug: props.listing.slug,
              image_id: currentImage.id
            }
          }))}
          className="icon-button fa fa-trash image-delete" />
        <Tooltip placement="bottom" target="deleteImage" delay={0}>Delete photo</Tooltip>

        <S3Uploader
          onProgress={props.onImageUploadProgress}
          onFinish={props.onImageUploadFinish}
          signingUrlQueryParams={{ slug: slug }}>

          <i
            id="addImage"
            title="Add new photo"
            tabIndex="0"
            role="button"
            className="icon-button fa fa-plus-circle" />
          <Tooltip placement="bottom" target="addImage" delay={0}>Add new photo</Tooltip>

        </S3Uploader>
      </div>
    </div>
  )


}

class ListingImages extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({ type: 'SET_LISTING_CURRENT_IMAGE' })
  }

  handleSlideChange(index) {
    const { dispatch, images } = this.props
    const image = images[index]

    dispatch({ type: 'SET_LISTING_CURRENT_IMAGE', data: image })
  }

  render() {
    const { images, dispatch, canEdit, slug, isLoading, uploadProgress, currentImage } = this.props
    const hasSlides = images && images.length > 0

    return (
      <Loader
        loading={isLoading}
        progress={uploadProgress}
      >
        {hasSlides &&
          <div className="listing-images text-center">
            {hasSlides &&
              <ETSlider
                afterChange={this.handleSlideChange.bind(this)}
                slides={
                  images.map(image => {
                    const url = `${process.env.REACT_APP_S3_URL}/${image.key}`

                    let style = {
                      background: `url('${url}') no-repeat center center`,
                      height: '300px'
                    }

                    return (
                      <div
                        className="listing-image"
                        key={image.key}>
                        <div style={style} />
                      </div>
                    )
                  })
                }
              />
            }

            {canEdit &&
              <ImageActions
                dispatch={dispatch}
                onImageUploadProgress={this.props.onImageUploadProgress}
                onImageUploadFinish={this.props.onImageUploadFinish}
                hasSlides={hasSlides}
                slug={slug}
                currentImage={currentImage}
              />
            }
          </div>
        }

        {!hasSlides && canEdit &&
          <S3Uploader
            onProgress={this.props.onImageUploadProgress}
            onFinish={this.props.onImageUploadFinish}
            signingUrlQueryParams={{ slug }}>

            <div className="listing-images text-center no-content uploadable">
              <div className="upload-wrapper">
                <i className="fa fa-camera-retro camera"></i>
                <span className="add-picture-cta">
                  Add a photo
                </span>
              </div>
            </div>
          </S3Uploader>
        }

        {!hasSlides && !canEdit &&
          <div className="listing-images text-center no-content">
            <i className="fa fa-camera-retro camera"></i>
            No photos added
          </div>
        }
      </Loader>
    )
  }

}

const TitleBar = (props) => {
  return (
    <div className="title-bar">
    </div>
  )
}

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

const DailyHours = (props) => {
  const { label, hours } = props.hours

  return (
    <div className="daily-hours pt-2 pb-2">
      <p className="day">{label}</p>
      <p className="hours">
        {hours ||
          <span className="closed">
            CLOSED
          </span>
        }
      </p>
    </div>
  )
}

const OperatingHours = (props) => {
  const { dispatch, hours, canEdit } = props
  const hasHours = hours && hours.length > 0

  return (
    <div className="card operating-hours">
      <div className="card-header">
        Operating Hours
      </div>
      <div className="card-block pt-3">
        {canEdit && hasHours &&
          <button
            onClick={() => dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_operating_hours' })}
            className="btn btn-sm btn-default btn-block">
            Edit
          </button>
        }

        {hasHours &&
          <div>
            {hours.map(hours => {
              return (
                <DailyHours key={hours.day} hours={hours} />
              )
            })}
          </div>
        }

        {!hasHours &&
          <div className="daily-hours no-content">
            <p>No operating hours set!</p>
            {canEdit &&
              <button
                onClick={() => dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_operating_hours' })}
                className="btn btn-default btn-block">
                Add
              </button>
            }
          </div>
        }
      </div>
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

const ListingMap = props => {
  const { locations, canEdit, dispatch } = props
  const hasLocations = locations && locations.length > 0

  if (hasLocations) {
    const geocoder = new window.google.maps.Geocoder()
    const latLng = {lat: locations[0].lat, lng: locations[0].lng}

    geocoder.geocode({'location': latLng}, function(results, status) {
      if (status === 'OK') {
        dispatch({ type: 'SET_LISTING_LOCATION', data: [{
          ...locations[0],
          address: results[0].formatted_address
        }]})
      }
    })
  }

  return (
    <div className="listing-map">
      <h3>
        How to get here
        {canEdit && hasLocations &&
          <a className="btn btn-sm btn-default ml-3" href="" onClick={props.onClickLocationEdit}>
            Edit
          </a>
        }
      </h3>
      {hasLocations &&
        <p>{locations[0].address}</p>
      }
      <div className="listing-map-area">
        {hasLocations &&
          <Map
            markers={[
              <Marker
                key={`${locations[0].lat}+${locations[0].lng}`}
                position={{
                  lat: locations[0].lat,
                  lng: locations[0].lng
                }}
              />
            ]}
            defaultOptions={{
              scrollwheel: false
            }}
            center={{
              lat: locations[0].lat,
              lng: locations[0].lng
            }}
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
          />
        }

        {!hasLocations &&
          <div className="no-content">
            {canEdit &&
              <a
                href=""
                onClick={props.onClickLocationEdit}
                className="btn btn-default">
                Add a location
              </a>
            }
            {!canEdit &&
              <p>No location set!</p>
            }
          </div>
        }
      </div>
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
