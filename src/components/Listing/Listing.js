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
import Ethicality from '../Ethicality/Ethicality'

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

    const props = this.props
    const hasSlides = props.images && props.images.length > 0

    if (hasSlides) {
      slides = props.images.map(image => {
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

          <AddImage
            dispatch={props.dispatch}
            listing={props.listing}
            onImageUploadProgress={props.onImageUploadProgress}
            onImageUploadFinish={props.onImageUploadFinish}
            hasSlides={hasSlides} />
        </div>
      )
    }
    else {
      content = (
        <S3Uploader
          onProgress={props.onImageUploadProgress}
          onFinish={props.onImageUploadFinish}
          signingUrlQueryParams={{ slug: props.listing.slug }}>

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

    return (
      <Loader
        loading={props.listing.isImageLoading}
        progress={props.listing.uploadProgress}>
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

  const { dispatch } = props

  if (props.ethicalities && props.ethicalities.length) {
    ethicalities = (
      <div>
        <Button
          block
          size="sm"
          color="default"
          onClick={() => dispatch({ type: 'SET_EDITING_LISTING_ETHICALITIES', data: true })}>
          Edit
        </Button>
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
        <Button
          block
          color="default"
          onClick={() => dispatch({ type: 'SET_EDITING_LISTING_ETHICALITIES', data: true })}>
          Add
        </Button>
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
  const { dispatch } = props
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
        <button
          onClick={() => dispatch({ type: 'SET_EDITING_LISTING_OPERATING_HOURS', data: true })}
          className="btn btn-default btn-block">
          Add
        </button>
      </div>
    )
  }

  return (
    <div className="card operating-hours">
      <div className="card-header">
        Operating Hours
      </div>
      <div className="card-block pt-3">
        {props.hours && props.hours.length > 0 &&
          <button
            onClick={() => dispatch({ type: 'SET_EDITING_LISTING_OPERATING_HOURS', data: true })}
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
        />
      </div>

      <OperatingHours
        dispatch={props.dispatch}
        hours={props.hours} />
    </aside>
  )
}

const Bio = (props) => {
  let bio
  let edit

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
        <a
          href=""
          onClick={props.onClickDescriptionEdit}
          className="btn btn-default">
          Add a description
        </a>
      </div>
    )
  }

  return (
    <div className="bio">
      <h3>
        {props.title}
        {edit}
      </h3>
      {bio}
    </div>
  )
}

const ListingMap = props => {
  let location
  let edit

  if (!props.locations || !props.locations.length) {
    location = (
      <div className="no-content">
        <a
          href=""
          onClick={props.onClickLocationEdit}
          className="btn btn-default">
          Add a location
        </a>
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
        {edit}
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
        bio={props.bio} />

      <ListingMap
        onClickLocationEdit={props.onClickLocationEdit}
        locations={props.locations}
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

  return (
    <div className="row listing-content">

      <div className="col-12 hidden-md-up">
        <EthicalityArea
          dispatch={props.dispatch}
          ethicalityChoices={ethicalityChoices}
          ethicalities={ethicalities} />
      </div>

      <ListingInfo
        className="listing-info col-xl-9 col-lg-8 col-md-7"
        onClickDescriptionEdit={props.onClickDescriptionEdit}
        onClickLocationEdit={props.onClickLocationEdit}
        locations={locations}
        bio={bio}
        title={title} />

      <AsideInfo
        dispatch={props.dispatch}
        className="col-xl-3 col-lg-4 col-md-5"
        ethicalityChoices={ethicalityChoices}
        ethicalities={ethicalities}
        hours={operating_hours}/>
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
    dispatch({ type: 'SET_EDITING_LISTING_DESCRIPTION', data: true })
  }

  onClickLocationEdit(e) {
    const { dispatch } = this.props

    e.preventDefault()
    dispatch({ type: 'SET_EDITING_LISTING_LOCATION', data: true })
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
              listing={listing}
              onImageUploadProgress={this.onImageUploadProgress.bind(this)}
              onImageUploadFinish={this.onImageUploadFinish.bind(this)}
              images={listing.images}
              />
            <TitleBar
              title={listing.title} />

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
