import React from 'react'
import Slider from 'react-slick'

import { connect } from 'react-redux'

import { getListing } from '../../actions/listing'
import Loader from '../Global/Loader'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import './Listing.sass'

const ListingImages = (props) => {

  if (!props.images || !props.images.length) {
    return (
      <div className="listing-images no-content text-center">
        <i className="fa fa-camera-retro"></i>
        <br/>
        <a href="" role="button" className="btn btn-default">Add a picture!</a>
      </div>
    )
  }

  let slides = props.images.map(image => {
    let style = {
      background: `url('${image.src}') no-repeat center center`,
      height: '300px'
    }

    return (
      <div
        className="listing-image"
        key={image.src}>
        <div style={style} />
      </div>
    )
  })

  if (slides.length) {
    return (
      <div className="listing-images">
        {slides.length &&
          <Slider
            dots={false}
            infinite={true}
            slidesToShow={slides.length}>

            {slides}
          </Slider>
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

const Map = withGoogleMap(props => {

  let bounds = new window.google.maps.LatLngBounds()

  let markers = props.locations.map(l => {
    bounds.extend(l)

    return (
      <Marker key={`${l.lat}+${l.lng}`} position={l} />
    )
  })

  let onLoad = (map) => {
    if (map) {
      map.fitBounds(bounds)
    }
  }

  if (props.locations.length) {
    return (
      <GoogleMap
        ref={onLoad}
        defaultZoom={12}
        defaultCenter={props.locations[0]}
        defaultOptions={{
          scrollwheel: false
        }}>

        {markers}

      </GoogleMap>
    )
  }

})

const ListingMap = props => {
  let location

  if (!props.locations || !props.locations.length) {
    location = (
      <div className="no-content">
        <a href="" className="btn btn-default">Add a location</a>
      </div>
    )
  }
  else {
    location = (
      <Map
        locations={props.locations}
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

  render() {
    const { listing, isListingLoading } = this.props

    return (
      <Loader loading={isListingLoading}>
        <div className="listing-detail">
          <ListingImages images={listing.images} />
          <TitleBar
            title={listing.title} />

          <AsideInfo
            ethicalities={listing.ethicalities}
            hours={listing.hours}/>

          <ListingInfo
            onClickDescriptionEdit={this.onClickDescriptionEdit.bind(this)}
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