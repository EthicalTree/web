import './NewLocationModal.css'

import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../../Modal'
import { Map } from '../../../../components/Maps/Map'
import { Icon } from '../../../../components/Icon'
import { Marker } from 'react-google-maps'

import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Row,
  Col,
  UncontrolledTooltip as Tooltip,
} from 'reactstrap'

import { getLocationDefaults } from '../../../../actions/admin'

const google = window.google

class NewLocationModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      center: null,
      address: '',
    }
    this.geocoder = new google.maps.Geocoder()
  }

  submit(e) {
    e.preventDefault()
    const { dispatch } = this.props
    const { center } = this.state

    dispatch(getLocationDefaults(center))
  }

  onAddressChange = e => {
    e.preventDefault()
    const address = e.target.value

    if (address) {
      this.setState({ address })
    }

    if (!e.key || e.key === 'Enter') {
      if (this.state.address) {
        this.geocoder.geocode(
          { address: this.state.address },
          (results, status) => {
            const { OK, ZERO_RESULTS } = google.maps.GeocoderStatus

            if (status === OK && status !== ZERO_RESULTS) {
              let { lat, lng } = results[0].geometry.location
              let location = { lat: lat(), lng: lng() }

              this.setState({
                center: location,
              })
            }
          }
        )
      }
    }
  }

  render() {
    const { modal } = this.props
    const { center, existingLocations } = this.state

    return (
      <Modal
        className="admin-new-location-modal medium-modal"
        loading={modal.isLoading}
        contentLabel="New Location"
        onSave={this.submit.bind(this)}
        modalName="admin-new-location"
        saveLabel="Search"
      >
        <Row>
          <Col>
            <FormGroup>
              <Label for="search" className="location-search-label">
                Search <Icon iconKey="info" id="location-search-tooltip" />
                <Tooltip
                  placement="top"
                  target={'location-search-tooltip'}
                  delay={0}
                >
                  Search for an area to create a new location. This will
                  populate the location with values that our maps API think you
                  want, but all fields are still editable.
                </Tooltip>
              </Label>
              <InputGroup>
                <Input
                  autoFocus
                  onKeyUp={this.onAddressChange}
                  name="search"
                  id="search"
                  placeholder="(i.e.) Nepean, ON"
                />
                <InputGroupAddon addonType="append">
                  <Button color="default" onClick={this.onAddressChange}>
                    Find
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>

        {existingLocations && existingLocations.map(location => location.name)}

        {center && (
          <Row>
            <Col className="location-map">
              <Map
                center={center}
                zoom={16}
                defaultOptions={{
                  zoomControl: true,
                  draggableCursor: 'pointer',
                }}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
              >
                <Marker position={center} />
              </Map>
            </Col>
          </Row>
        )}
      </Modal>
    )
  }
}

const select = state => ({
  admin: state.admin,
  modal: state.modal,
})

export default connect(select)(NewLocationModal)
