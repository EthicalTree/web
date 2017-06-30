import React from 'react'
import { connect } from 'react-redux'
import { Marker } from 'react-google-maps'
import { getListing, addImageToListing } from '../../actions/listing'

import Loader from '../Global/Loader'
import ETSlider from '../Global/Slider'
import S3Uploader from '../Global/S3'
import Map from '../Global/Map'

import './Listing.sass'

const ImageDropzone = (props) => {
  const progress = props.listing.uploadProgress

  return (
    <Loader
      progress={progress}>
      <div className="listing-images uploadable no-content text-center">
        <i className="fa fa-camera-retro camera"></i>
        <span className="add-picture-cta">
          Add a picture!
        </span>
      </div>
    </Loader>
  )

}

const ListingImages = (props) => {

  if (!props.images || !props.images.length) {

    return (
      <S3Uploader
        onProgress={props.onImageUploadProgress}
        onFinish={props.onImageUploadFinish}
        signingUrlQueryParams={{ slug: props.listing.slug }}>
        <ImageDropzone listing={props.listing} />
      </S3Uploader>
    )
  }

  let slides = props.images.map(image => {
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

  if (slides.length) {
    return (
      <div className="listing-images">
        {slides.length &&
          <ETSlider slides={slides} />
        }
      </div>
    )
  }

}

const TitleBar = (props) => {
  return (
    <div className="title-bar">
      <h2 className="title">{props.title}</h2>
    </div>
  )
}

const Ethicality = (props) => {
  let ethicalities

  if (props.ethicalities && props.ethicalities.length) {
    ethicalities = props.ethicalities.map(quality => {
      return (
        <div key={quality.name} className="quality">
          <i className="fa fa-superpowers"></i>
          <p className="name">{quality.name}</p>
        </div>
      )
    })
  }
  else {
    ethicalities = (
      <div className="no-content">
        <i className="fa fa-heart-o"></i>
        <a href="" role="button" className="btn btn-default btn-block">Add</a>
      </div>
    )
  }

  return (
    <div className="ethicality">
      <h3 className="title">Ethicality</h3>
      <div className="ethicalities">
        {ethicalities}
      </div>
    </div>
  )

}

const DailyHours = (props) => {
  return (
    <div className="daily-hours">
      <p>{props.day}</p>
      <p>{props.hours}</p>
    </div>
  )
}

const OperatingHours = (props) => {
  let hours

  if (props.hours && props.hours.length) {
    hours = props.hours.map(hours => {
      return (
        <DailyHours key={hours.day} day={hours.day} hours={hours.hours} />
      )
    })
  }
  else {
    hours = (
      <div className="daily-hours no-content">
        <i className="fa fa-clock-o"></i>
        <a href="" role="button" className="btn btn-default btn-block">Add</a>
      </div>
    )
  }

  return (
    <div className="operating-hours">
      <h3 className="title">Operating Hours</h3>
      {hours}
    </div>
  )
}

const AsideInfo = (props) => {
  return (
    <aside>
      <Ethicality ethicalities={props.ethicalities} />
      <OperatingHours hours={props.hours} />
    </aside>
  )
}

const Bio = (props) => {
  let bio

  if (props.bio) {
    bio = (
      <p>{props.bio}</p>
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
      <h3>About {props.title}</h3>
      {bio}
    </div>
  )
}

const ListingMap = props => {
  let location

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
  }

  return (
    <div className="listing-map">
      <h3>How to get here</h3>
      <div className="listing-map-area">
        {location}
      </div>
    </div>
  )

}

const ListingInfo = (props) => {
  return (
    <div className="listing-info">
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

    console.log(listing)

    dispatch(addImageToListing(listing.slug, image.key))
  }

  render() {
    const { listing } = this.props

    return (
      <Loader loading={listing.isListingLoading}>
        <div className="listing-detail">
          <ListingImages
            listing={listing}
            onImageUploadProgress={this.onImageUploadProgress.bind(this)}
            onImageUploadFinish={this.onImageUploadFinish.bind(this)}
            images={listing.images}
            />
          <TitleBar
            title={listing.title} />

          <AsideInfo
            ethicalities={listing.ethicalities}
            hours={listing.hours}/>

          <ListingInfo
            onClickDescriptionEdit={this.onClickDescriptionEdit.bind(this)}
            onClickLocationEdit={this.onClickLocationEdit.bind(this)}
            locations={listing.locations}
            bio={listing.bio}
            title={listing.title} />
        </div>
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
