import './EditLocationModal.css'

import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../../Modal'

import { Form, Label, Input, Row, Col } from 'reactstrap'

import { SelectAreaMap } from '../../../../components/Maps/SelectAreaMap'

import { editLocation } from '../../../../actions/admin'

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

    dispatch(editLocation(this.state))
  }

  render() {
    const { modal } = this.props

    return (
      <Modal
        className="admin-edit-location-modal large-modal"
        loading={modal.isLoading}
        contentLabel="Edit Location"
        onSave={this.submit.bind(this)}
        modalName="admin-edit-location"
        saveLabel="Save"
      >
        <Form onSubmit={this.submit.bind(this)}>
          <Row>
            <Col>
              <Label for="name">Name</Label>
              <Input
                autoFocus
                value={this.state.name}
                onChange={e => {
                  this.setState({ name: e.target.value })
                }}
                type="text"
                name="name"
                id="name"
                placeholder="Ottawa, ON"
              />
            </Col>
          </Row>

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
