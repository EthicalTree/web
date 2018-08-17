import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../Modal'
import PhoneInput from 'react-phone-number-input'
import { isValidNumber } from 'libphonenumber-js'

import { Label, Input, Row, Col } from 'reactstrap'

import { editListing } from '../../../actions/listing'

class EditDescriptionModal extends React.Component {
  constructor(props) {
    super(props)
    const { listing } = props

    this.state = {
      title: listing.title,
      bio: listing.bio,
      website: listing.website,
      phone: listing.phone,
      validPhone: true,
    }
  }

  submit(e) {
    e.preventDefault()

    const { dispatch, listing } = this.props

    dispatch(
      editListing({
        ...this.state,
        slug: listing.slug,
      })
    )
  }

  changePhone = phone => {
    if (isValidNumber(phone)) {
      this.setState({ phone, validPhone: true })
    } else {
      this.setState({ validPhone: false })
    }
  }

  render() {
    const { listing, modal } = this.props

    return (
      <Modal
        className="edit-description-modal large-modal"
        loading={modal.isLoading}
        contentLabel="Edit Listing"
        onSave={this.submit.bind(this)}
        saveDisabled={!this.state.validPhone}
        modalName="edit-description">
        <Row>
          <Col className="mb-4" xs={12} md={6}>
            <Label for="listingTitle">Title</Label>
            <Input
              defaultValue={this.state.title || listing.title}
              onChange={e => {
                this.setState({ title: e.target.value })
              }}
              type="text"
              name="listingTitle"
              id="listingTitle"
            />
          </Col>

          <Col className="mb-4" xs={12} md={6}>
            <Label for="listingWebsite">Website</Label>
            <Input
              defaultValue={this.state.website || listing.website}
              onChange={e => {
                this.setState({ website: e.target.value })
              }}
              type="text"
              name="listingWebsite"
              id="listingWebsite"
            />
          </Col>
        </Row>

        <Row>
          <Col className="mb-4" xs={12} md={6}>
            <Label for="phoneNumber">Phone Number</Label>
            <PhoneInput
              placeholder="Enter phone number"
              country="CA"
              value={this.state.phone}
              onChange={this.changePhone}
              name="phoneNumber"
              id="phoneNumber"
              error="Phone Number is invalid"
              indicateInvalid={!this.state.validPhone}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Label for="listingDescription">Description</Label>
            <Input
              autoFocus
              defaultValue={this.state.bio || listing.bio}
              onChange={e => {
                this.setState({ bio: e.target.value })
              }}
              type="textarea"
              name="listingDescription"
              id="listingDescription"
              placeholder="Tell the world what makes you special!"
            />
          </Col>
        </Row>
      </Modal>
    )
  }
}

const select = state => {
  return {
    listing: state.listing,
    modal: state.modal,
  }
}

export default connect(select)(EditDescriptionModal)
