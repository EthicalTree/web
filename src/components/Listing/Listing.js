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
import { hasPermission } from '../Session/permissions'

import './Listing.sass'

const AddImage = (props) => {

  return (
    <div>
      <div className="actions">
        <div><div className="triangle"></div></div>
        <i
          id="makeCoverPhoto"
          title="Make cover photo"
          role="button"
          tabIndex="0"
          onClick={() => props.dispatch(setConfirm({
            title: 'Set Cover Photo',
            msg: 'Are you sure you want to make this photo your cover photo?',
            action: makeImageCover,
            data: {
              listing_slug: props.listing.slug,
              image_id: props.listing.currentImage.id
            }
          }))}
          className="icon-button fa fa-file-picture-o" />
        <Tooltip placement="bottom" target="makeCoverPhoto" delay={0}>Make cover photo</Tooltip>

        <i
          id="deleteImage"
          title="Delete photo"
          role="button"
          tabIndex="0"
          onClick={() => props.dispatch(setConfirm({
            title: 'Delete Photo',
            msg: 'Are you sure you want to delete this photo?',
            action: deleteImageFromListing,
            data: {
              listing_slug: props.listing.slug,
              image_id: props.listing.currentImage.id
            }
          }))}
          className="icon-button fa fa-trash image-delete" />
        <Tooltip placement="bottom" target="deleteImage" delay={0}>Delete photo</Tooltip>

        <S3Uploader
          onProgress={props.onImageUploadProgress}
          onFinish={props.onImageUploadFinish}
          signingUrlQueryParams={{ slug: props.listing.slug }}>

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
    const { dispatch } = this.props
    const image = this.props.listing.images[index]

    dispatch({ type: 'SET_LISTING_CURRENT_IMAGE', data: image })
  }

  render() {
    let slides
    let content

    const { images, dispatch, listing, session } = this.props
    const hasSlides = images && images.length > 0
    const canEdit = hasPermission(session, 'edit-images')

    if (hasSlides) {
      slides = images.map(image => {
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

      content = (
        <div className="listing-images text-center">
          {hasSlides &&
            <ETSlider
              afterChange={this.handleSlideChange.bind(this)}
              slides={slides} />
          }

          {canEdit &&
            <AddImage
              dispatch={dispatch}
              listing={listing}
              onImageUploadProgress={this.props.onImageUploadProgress}
              onImageUploadFinish={this.props.onImageUploadFinish}
              hasSlides={hasSlides}
            />
          }
        </div>
      )
    }
    else if (canEdit) {
      content = (
        <S3Uploader
          onProgress={this.props.onImageUploadProgress}
          onFinish={this.props.onImageUploadFinish}
          signingUrlQueryParams={{ slug: listing.slug }}>

          <div className="listing-images text-center no-content uploadable">
            <div className="upload-wrapper">
              <i className="fa fa-camera-retro camera"></i>
              <span className="add-picture-cta">
                Add a photo
              </span>
            </div>
          </div>
        </S3Uploader>
      )
    }
    else {
      content = (
        <div className="listing-images text-center no-content">
          <i className="fa fa-camera-retro camera"></i>
          No photos added
        </div>
      )
    }

    return (
      <Loader
        loading={listing.isImageLoading}
        progress={listing.uploadProgress}>
        {content}
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
  let ethicalities

  const { dispatch, session } = props
  const canEdit = hasPermission(session, 'edit-ethicalities')

  if (props.ethicalities && props.ethicalities.length) {
    ethicalities = (
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

        {props.ethicalities.map(ethicality => {
          return (
            <Ethicality
              key={ethicality.slug}
              className="p-3"
              name={ethicality.name}
              slug={ethicality.slug}
              icon_key={ethicality.icon_key}
            />
          )
        })}
      </div>
    )
  }
  else {
    ethicalities = (
      <div className="no-content">
        <p>No ethicalities set!</p>
        {canEdit &&
          <Button
            block
            color="default"
            onClick={() => dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_ethicalities' })}>
            Add
          </Button>
        }

      </div>
    )
  }

  return (
    <div className={`card ethicality ${props.className}`}>
      <div className="card-block ethicalities">
        {ethicalities}
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
  const { dispatch, session } = props
  let hours

  if (props.hours && props.hours.length) {
    hours = props.hours.map(hours => {
      return (
        <DailyHours key={hours.day} hours={hours} />
      )
    })
  }
  else {
    hours = (
      <div className="daily-hours no-content">
        <p>No operating hours set!</p>
        {hasPermission(session, 'edit-operating-hours') &&
          <button
            onClick={() => dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_operating_hours' })}
            className="btn btn-default btn-block">
            Add
          </button>
        }
      </div>
    )
  }

  return (
    <div className="card operating-hours">
      <div className="card-header">
        Operating Hours
      </div>
      <div className="card-block pt-3">
        {hasPermission(session, 'edit-operating-hours') && props.hours && props.hours.length > 0 &&
          <button
            onClick={() => dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_operating_hours' })}
            className="btn btn-sm btn-default btn-block">
            Edit
          </button>
        }
        {hours}
      </div>
    </div>
  )
}

const AsideInfo = (props) => {
  return (
    <aside className={props.className}>
      <div className="hidden-sm-down">
        <EthicalityArea
          dispatch={props.dispatch}
          ethicalityChoices={props.ethicalityChoices}
          ethicalities={props.ethicalities}
          session={props.session}
        />
      </div>

      <OperatingHours
        dispatch={props.dispatch}
        hours={props.hours}
        session={props.session}
      />
    </aside>
  )
}

const Bio = (props) => {
  let bio
  let edit

  const canEdit = hasPermission(props.session, 'edit-description')

  if (props.bio) {
    bio = (
      <p>{props.bio}</p>
    )

    edit = (
      <a className="btn btn-sm btn-default ml-3" href="" onClick={props.onClickDescriptionEdit}>
        Edit
      </a>
    )
  }
  else {
    bio = (
      <div className="no-content">
        {canEdit &&
          <a
            href=""
            onClick={props.onClickDescriptionEdit}
            className="btn btn-default">
            Add a description
          </a>
        }
        {!canEdit &&
          <p>This listing has no desciption!</p>
        }
      </div>
    )
  }

  return (
    <div className="bio">
      <h3>
        {props.title}
        {canEdit &&
          edit
        }
      </h3>
      {bio}
    </div>
  )
}

const ListingMap = props => {
  let location
  let edit

  const canEdit = hasPermission(props.session, 'edit-location')

  if (!props.locations || !props.locations.length) {
    location = (
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
    )
  }
  else {
    const { lat, lng } = props.locations[0]

    const markers = [<Marker key={`${lat}+${lng}`} position={{ lat, lng }} />]

    location = (
      <Map
        markers={markers}
        defaultOptions={{
          scrollwheel: false
        }}
        center={{ lat, lng }}
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }/>
    )

    edit = (
      <a className="btn btn-sm btn-default ml-3" href="" onClick={props.onClickLocationEdit}>
        Edit
      </a>
    )
  }

  return (
    <div className="listing-map">
      <h3>
        How to get here
        {canEdit &&
          edit
        }
      </h3>
      <div className="listing-map-area">
        {location}
      </div>
    </div>
  )

}

const ListingInfo = (props) => {
  return (
    <div className={props.className}>
      <Bio
        onClickDescriptionEdit={props.onClickDescriptionEdit}
        title={props.title}
        bio={props.bio}
        session={props.session}
      />

      <ListingMap
        onClickLocationEdit={props.onClickLocationEdit}
        locations={props.locations}
        session={props.session}
      />

      <div className="clearfix"></div>
    </div>
  )
}

const ListingContent = (props) => {
  const {
    locations,
    bio,
    title,
    ethicalities,
    operating_hours,
    ethicalityChoices,
  } = props.listing

  const { session } = props

  return (
    <div className="row listing-content">

      <div className="col-12 hidden-md-up">
        <EthicalityArea
          dispatch={props.dispatch}
          ethicalityChoices={ethicalityChoices}
          ethicalities={ethicalities}
          session={session}
        />
      </div>

      <ListingInfo
        className="listing-info col-xl-9 col-lg-8 col-md-7"
        onClickDescriptionEdit={props.onClickDescriptionEdit}
        onClickLocationEdit={props.onClickLocationEdit}
        locations={locations}
        bio={bio}
        title={title}
        session={session}
      />

      <AsideInfo
        dispatch={props.dispatch}
        className="col-xl-3 col-lg-4 col-md-5"
        ethicalityChoices={ethicalityChoices}
        ethicalities={ethicalities}
        hours={operating_hours}
        session={session}
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
    const { listing, dispatch, session } = this.props

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
              listing={listing}
              onImageUploadProgress={this.onImageUploadProgress.bind(this)}
              onImageUploadFinish={this.onImageUploadFinish.bind(this)}
              images={listing.images}
              session={session}
            />
            <TitleBar
              title={listing.title}
            />

            <ListingContent
              dispatch={dispatch}
              listing={listing}
              onClickDescriptionEdit={this.onClickDescriptionEdit.bind(this)}
              onClickLocationEdit={this.onClickLocationEdit.bind(this)}
              session={session}
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
    session: state.session
  }
}

export default connect(select)(Listing)
