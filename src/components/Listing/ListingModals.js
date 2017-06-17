import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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

import { addListing } from '../../actions/listing'

class AddListingModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      title: ''
    }
  }

  submit(e) {
    e.preventDefault()

    const { dispatch, history } = this.props

    dispatch(addListing(this.state, history))
  }

  render() {
    const { listing, dispatch } = this.props

    return (
      <Modal
        className="login-modal small-modal"
        loading={listing.loginLoading}
        contentLabel="Add New Listing"
        onRequestClose={e => { dispatch({ type: 'SET_ADD_LISTING_MODAL', data: false }) }}
        isOpen={listing.isAddingListing}>

        <Container>
          {listing.addListingErrors &&
            <Row>
              <Col>
                <Alert color="danger">
                  {listing.addListingErrors}
                </Alert>
              </Col>
            </Row>
          }

          <Row>
            <Col>
              <Form action="/login" method="post" onSubmit={this.submit.bind(this)}>
                <FormGroup>
                  <Label for="listingTitle">Listing Title</Label>
                  <Input
                    autoFocus
                    value={this.state.title}
                    onChange={e => { this.setState({ title: e.target.value }) }}
                    type="text"
                    name="listingTitle"
                    id="listingTitle"
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

export default withRouter(connect(select)(AddListingModal))
