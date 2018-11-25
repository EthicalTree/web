import './EditLocationModal.css'

import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import { Modal } from '../../Modal'

import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'

import { SelectAreaMap } from '../../../../components/Maps/SelectAreaMap'

import { editLocation, addLocation } from '../../../../actions/admin'
import { LOCATION_TYPES } from '../../../Admin/Locations/utils'

class EditLocationModal extends React.Component {
  handleBoundsChanged = bounds => {
    const ne = bounds.getNorthEast()
    const sw = bounds.getSouthWest()
    const center = bounds.getCenter()

    this.setState({
      boundlat1: ne.lat(),
      boundlng1: ne.lng(),
      boundlat2: sw.lat(),
      boundlng2: sw.lng(),
      lat: center.lat(),
      lng: center.lng(),
    })
  }

  constructor(props) {
    super(props)

    const location = props.modal.modalData
    this.state = location
  }

  submit(e) {
    e.preventDefault()
    const { dispatch } = this.props
    const { id } = this.state
    if (id) {
      dispatch(editLocation(this.state))
    } else {
      dispatch(addLocation(this.state))
    }
  }

  render() {
    const { modal } = this.props
    const {
      id,
      name,
      city,
      timezone,
      state,
      country,
      neighbourhood,
      locationType,
    } = this.state

    return (
      <Modal
        className="admin-edit-location-modal large-modal"
        loading={modal.isLoading}
        contentLabel="Edit Location"
        onSave={this.submit.bind(this)}
        modalName="admin-edit-location"
        saveLabel={id ? "Save" : "Create"}
      >
        <Form onSubmit={this.submit.bind(this)}>
          <FormGroup row>
            <Col xs={4}>
              <Label for="name">Name</Label>
            </Col>
            <Col xs={8}>
              <Input
                autoFocus
                value={name}
                onChange={e => {
                  this.setState({ name: e.target.value })
                }}
                type="text"
                name="name"
                id="name"
                placeholder="Ottawa, ON"
              />
            </Col>
          </FormGroup>

          {locationType === 'neighbourhood' && (
            <FormGroup row>
              <Col xs={4}>
                <Label for="neighbourhood">Neighbourhood Name:</Label>
              </Col>
              <Col xs={8}>
                <Input
                  value={neighbourhood}
                  onChange={e => {
                    this.setState({ neighbourhood: e.target.value })
                  }}
                  type="text"
                  name="neighbourhood"
                  id="neighbourhood"
                />
              </Col>
            </FormGroup>
          )}

          <FormGroup row>
            <Col xs={4}>
              <Label for="city">City:</Label>
            </Col>
            <Col xs={8}>
              <Input
                value={city}
                onChange={e => {
                  this.setState({ city: e.target.value })
                }}
                type="text"
                name="city"
                id="city"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col xs={4}>
              <Label for="state">State:</Label>
            </Col>
            <Col xs={8}>
              <Input
                value={state}
                onChange={e => {
                  this.setState({ state: e.target.value })
                }}
                type="text"
                name="state"
                id="state"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col xs={4}>
              <Label for="country">Country:</Label>
            </Col>
            <Col xs={8}>
              <Input
                value={country}
                onChange={e => {
                  this.setState({ country: e.target.value })
                }}
                type="text"
                name="country"
                id="country"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col xs={4}>Neighbourhood/City:</Col>
            <Col xs={8}>
              <Input
                type="select"
                value={locationType}
                onChange={e =>
                  this.setState({ locationType: e.currentTarget.value })
                }
              >
                <option value={LOCATION_TYPES.neighbourhood}>
                  {LOCATION_TYPES.neighbourhood}
                </option>
                <option value={LOCATION_TYPES.city}>
                  {LOCATION_TYPES.city}
                </option>
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col xs={4}>Timezone:</Col>
            <Col xs={8}>
              <Input
                type="select"
                value={timezone}
                onChange={e =>
                  this.setState({ timezone: e.currentTarget.value })
                }
              >
                {moment.tz.names().map(tz => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>

          <Row className="mt-3">
            <Col className="location-map">
              <SelectAreaMap
                {...this.state}
                handleBoundsChanged={this.handleBoundsChanged}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

const select = state => ({
  admin: state.admin,
  modal: state.modal,
})

export default connect(select)(EditLocationModal)
