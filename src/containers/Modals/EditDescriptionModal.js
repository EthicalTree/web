import React from 'react'
import { connect } from 'react-redux'
import { Modal } from './Modal'

import {
  Label,
  Input,
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap'

import { editDescription } from '../../actions/listing'

class EditDescriptionModal extends React.Component {

  constructor(props) {
    super(props)
    const { listing } = props

    this.state = {
      title: listing.title,
      bio: listing.bio,
      website: listing.website
    }
  }

  submit(e) {
    e.preventDefault()

    const { dispatch, listing } = this.props

    dispatch(editDescription({
      ...this.state,
      slug: listing.slug
    }))
  }

  render() {
    const { listing, modal } = this.props

    return (
      <Modal
        className="edit-description-modal large-modal"
        loading={listing.isEditingDescriptionLoading}
        contentLabel="Edit Listing"
        onSave={this.submit.bind(this)}
        modalName="edit-description"
      >

        <Container>
          {modal.errors &&
            <Row>
              <Col>
                <Alert color="danger">
                  {modal.errors}
                </Alert>
              </Col>
            </Row>
          }

          <Row>
            <Col className="mb-4" xs={12} md={6}>
              <Label for="listingTitle">Title</Label>
              <Input
                defaultValue={this.state.title || listing.title}
                onChange={e => {this.setState({ title: e.target.value })}}
                type="text"
                name="listingTitle"
                id="listingTitle"
              />
            </Col>

            <Col className="mb-4" xs={12} md={6}>
              <Label for="listingWebsite">Website</Label>
              <Input
                defaultValue={this.state.website || listing.website}
                onChange={e => {this.setState({ website: e.target.value })}}
                type="text"
                name="listingWebsite"
                id="listingWebsite"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Label for="listingDescription">Description</Label>
              <Input
                autoFocus
                defaultValue={this.state.bio || listing.bio}
                onChange={e => { this.setState({ bio: e.target.value })}}
                type="textarea"
                name="listingDescription"
                id="listingDescription"
                placeholder="Tell the world what makes you special!"
              />
            </Col>
          </Row>

        </Container>
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

export default connect(select)(EditDescriptionModal)