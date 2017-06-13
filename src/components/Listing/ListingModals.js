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

class AddListingModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  submit(e) {

  }

  render() {
    const { listing, dispatch } = this.props

    return (
      <Modal
        className="login-modal small-modal"
        loading={listing.loginLoading}
        contentLabel="Add New Listing"
        onRequestClose={e => { dispatch({ type: 'SET_NEW_LISTING_MODAL', data: false }) }}
        isOpen={listing.isAddingListing}>

        <Container>
          {listing.addListingError &&
            <Row>
              <Col>
                <Alert color="danger">
                  {listing.addListingError}
                </Alert>
              </Col>
            </Row>
          }

          <Row>
            <Col>
              <Form action="/login" method="post" onSubmit={this.submit.bind(this)}>
                <FormGroup>
                  <Label for="listingName">Listing Name</Label>
                  <Input
                    autoFocus
                    value={this.state.name}
                    onChange={e => { this.setState({ name: e.target.value }) }}
                    type="text"
                    name="listingName"
                    id="listingName"
                    placeholder="What's this place called?"/>
                </FormGroup>

                <FormGroup className="mt-4">
                  <Button block color="success" role="button" type="submit">
                    Create Listing!
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

export default connect(select)(AddListingModal)
