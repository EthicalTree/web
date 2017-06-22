import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../Global'

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
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
      description: ''
    }
  }

  submit(e) {
    e.preventDefault()

    const { dispatch } = this.props

    dispatch(editDescription(this.state))
  }

  render() {
    const { listing, dispatch } = this.props

    return (
      <Modal
        className="edit-description-modal medium-modal"
        loading={listing.isEditingDescriptionLoading}
        contentLabel="Edit Decription"
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
              <Form method="post" onSubmit={this.submit.bind(this)}>
                <FormGroup>
                  <Label for="listingDescription">Listing Description</Label>
                  <Input
                    autoFocus
                    value={this.state.description}
                    onChange={e => { this.setState({ description: e.target.value }) }}
                    type="textarea"
                    name="listingDescription"
                    id="listingDescription"
                    placeholder="Tell the world what makes you special!"/>
                </FormGroup>

                <FormGroup className="mt-4 text-center">
                  <Button color="success" role="button" type="submit">
                    Save
                  </Button>
                </FormGroup>
              </Form>
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
