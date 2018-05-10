import React from 'react'
import { connect } from 'react-redux'
import { Marker } from 'react-google-maps'

import { Modal } from '../Modal'
import { Map } from '../../../components/Maps/Map'

import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Row,
  Col,
} from 'reactstrap'

import { editLocation } from '../../../actions/listing'

const google = window.google

class EditLocationModal extends React.Component {

  constructor(props) {
    super(props)
    const { listing } = props
    const location = listing.locations ? listing.locations[0] : {}

    this.state = {
      location,
      center: null,
      address: ''
    }

    this.geocoder = new google.maps.Geocoder()
  }

  submit(e) {
    e.preventDefault()

    const { dispatch, listing } = this.props

    dispatch(editLocation(listing.slug, this.state))
  }

  onAddressChange(e) {
    e.preventDefault()
    const address = e.target.value

    if (address) {
      this.setState({ address })
    }

    if (!e.key || e.key === 'Enter') {
      if (this.state.address) {
        this.geocoder.geocode({ address: this.state.address }, (results, status) => {
          const { OK, ZERO_RESULTS } = google.maps.GeocoderStatus

          if (status === OK && status !== ZERO_RESULTS) {
            let {lat, lng} = results[0].geometry.location
            let location = { lat: lat(), lng: lng() }

            this.setState({
              location: location,
              center: location
            })
          }
        })
      }
    }
  }

  onMapClick(e) {
    const { lat, lng } = e.latLng

    this.setState({ location: {
      lat: lat(),
      lng: lng()
    }})
  }

  render() {
    const { modal } = this.props
    let { location } = this.state

    let marker
    let center

    if (location) {
      const { lat, lng } = location
      marker = <Marker key={`${lat}+${lng}`} position={location} />
      center = { lat, lng }
    }

    return (
      <Modal
        className="edit-location-modal medium-modal"
        loading={modal.isLoading}
        contentLabel="Edit Location"
        onSave={this.submit.bind(this)}
        modalName="edit-location"
      >
        <Row>
          <Col>
            <FormGroup>
              <Label for="locationAddress">Address</Label>
              <InputGroup>
                <Input
                  autoFocus
                  onKeyUp={ this.onAddressChange.bind(this) }
                  name="locationAddress"
                  id="locationAddress"
                  placeholder="eg. Ricky's Rockin Restaurant"
                />
                <InputGroupAddon addonType="append">
                  <Button color="default" onClick={this.onAddressChange.bind(this)}>
                    Find
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="edit-location-map">
            <Map
              onClick={this.onMapClick.bind(this)}
              center={center}
              zoom={16}
              defaultOptions={{
                zoomControl: true,
                draggableCursor: 'pointer'
              }}
              containerElement={
                <div style={{ height: `100%` }} />
              }
              mapElement={
                <div style={{ height: `100%` }} />
              }
            >
              {marker}
            </Map>
          </Col>
        </Row>
      </Modal>
    )
  }

}

const select = (state) => {
  return {
    listing: state.listing,
    modal: state.modal
  }
}

export default connect(select)(EditLocationModal)
