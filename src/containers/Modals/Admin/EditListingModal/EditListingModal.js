import React from 'react'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Modal } from '../../Modal'

import {
  Form,
  Label,
  Input,
  Col,
} from 'reactstrap'

import { updateListing } from '../../../../actions/admin'

class EditListingModal extends React.Component {

  submit(e) {
    e.preventDefault()
    const { dispatch, modal } = this.props
    dispatch(updateListing(modal.modalData))
    dispatch({ type: 'CLOSE_MODAL' })
  }

  handleChange(obj) {
    const { dispatch } = this.props
    dispatch({ type: 'UPDATE_MODAL_DATA', data: obj })
  }

  render() {
    const { app, modal } = this.props
    const { planType, price, visibility } = modal.modalData

    return (
      <Modal
        className="admin-edit-listing-modal small-modal"
        loading={modal.isLoading}
        contentLabel="Edit Listing"
        onSave={this.submit.bind(this)}
        modalName="admin-edit-listing"
        saveLabel="Save"
      >
        <Form onSubmit={this.submit.bind(this)}>
          <Col className="mt-3 mb-3">
            <Label for="name">Plan Type</Label>
            <Input
              autoFocus
              value={planType}
              onChange={e => this.handleChange({ planType: e.target.value }) }
              type="select"
              name="name"
              id="name"
              placeholder="Enter a name"
            >
              <option value="">Free</option>
              {app.plans.map(p => {
                return (
                  <option
                    key={p.type}
                    value={p.type}
                  >
                    {`${p.name} ($${numeral(p.price).format('0.00')})`}
                  </option>
                )
              })}
            </Input>
          </Col>

          {planType &&
            <Col className="mt-3 mb-3">
              <Label for="description">Custom Price</Label>
              <Input
                onChange={e => { this.handleChange({ price: e.target.value }) }}
                type="text"
                value={price}
                placeholder="Override plan price"
                name="price"
                id="price"
              />
            </Col>
          }

          <Col className="mt-3 mb-3">
            <Label for="description">Visibility</Label>
            <Input
              type="select"
              name="visibility"
              onChange={e => this.handleChange({ visibility: e.target.value })}
              value={visibility || 'unpublished'}
            >
              <option value="published">Visible</option>
              <option value="unpublished">Hidden</option>
            </Input>
          </Col>

        </Form>
      </Modal>
    )
  }

}

const select = (state) => ({
  app: state.app,
  admin: state.admin,
  modal: state.modal
})

export default connect(select)(EditListingModal)
