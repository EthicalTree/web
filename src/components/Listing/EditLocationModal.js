import React from 'react'
import { connect } from 'react-redux'
import { Marker } from 'react-google-maps'

import { Modal } from '../Global'
import Map from '../Global/Map'

import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupButton,
  Button,
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap'

import { editLocation } from '../../actions/listing'

const google = window.google

class EditLocationModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      location: null,
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
    const { listing, dispatch } = this.props
    const { location } = this.state

    let marker

    if (location) {
      const { lat, lng } = location
      marker = <Marker key={`${lat}+${lng}`} position={location} />
    }

    return (
      <Modal
        className="edit-location-modal medium-modal"
        loading={listing.isEditingLocationLoading}
        contentLabel="Edit Location"
        onRequestClose={e => { dispatch({ type: 'SET_EDITING_LISTING_LOCATION', data: false }) }}
        isOpen={listing.isEditingLocation}>

        <Container>
          {listing.editLocationErrors &&
            <Row>
              <Col>
                <Alert color="danger">
                  {listing.editLocationErrors}
                </Alert>
              </Col>
            </Row>
          }

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
                    placeholder="eg. Ricky's Rockin Restaurant"/>
                  <InputGroupButton>
                    <Button className="btn btn-default" onClick={this.onAddressChange.bind(this)}>
                      Find
                    </Button>
                  </InputGroupButton>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="edit-location-map">
              <Map
                onClick={this.onMapClick.bind(this)}
                markers={[marker]}
                center={this.state.center}
                defaultOptions={{
                  zoomControl: true,
                  draggableCursor: 'pointer'
                }}
                containerElement={
                  <div style={{ height: `100%` }} />
                }
                mapElement={
                  <div style={{ height: `100%` }} />
                }/>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup className="mt-4 text-center">
                <Button color="success" role="button" onClick={this.submit.bind(this)}>
                  Save
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </Modal>
    )
  }

}

const select = (state) => {
  return {
    listing: state.listing
  }
}

export default connect(select)(EditLocationModal)
