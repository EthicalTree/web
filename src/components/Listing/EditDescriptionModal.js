import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../Global'

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

    this.state = {
      bio: props.listing.bio
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
    const { listing, dispatch } = this.props

    return (
      <Modal
        className="edit-description-modal medium-modal"
        loading={listing.isEditingDescriptionLoading}
        contentLabel="Edit Decription"
        onSave={this.submit.bind(this)}
        onRequestClose={e => { dispatch({ type: 'SET_EDITING_LISTING_DESCRIPTION', data: false }) }}
        isOpen={listing.isEditingDescription}>

        <Container>
          {listing.editDescriptionErrors &&
            <Row>
              <Col>
                <Alert color="danger">
                  {listing.editDescriptionErrors}
                </Alert>
              </Col>
            </Row>
          }

          <Row>
            <Col>
              <Label for="listingDescription">Listing Description</Label>
              <Input
                autoFocus
                defaultValue={listing.bio}
                onChange={e => { this.setState({ bio: e.target.value }) }}
                type="textarea"
                name="listingDescription"
                id="listingDescription"
                placeholder="Tell the world what makes you special!"/>
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

export default connect(select)(EditDescriptionModal)
