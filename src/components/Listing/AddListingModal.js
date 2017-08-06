import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Modal } from '../Global'

import {
  Form,
  Label,
  Input,
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
    this.setState({ title: '' })
  }

  render() {
    const { listing, dispatch } = this.props

    return (
      <Modal
        className="add-description-modal small-modal"
        loading={listing.isAddingListingLoading}
        contentLabel="Add New Listing"
        onSave={this.submit.bind(this)}
        saveLabel="Create"
        onRequestClose={e => { dispatch({ type: 'SET_ADD_LISTING_MODAL', data: false }) }}
        isOpen={listing.isAddingListing}>

        <Container>
          {listing.addListingErrors &&
            <Row>
              <Col>
                <Alert color="danger">
                  Name has already been taken
                </Alert>
              </Col>
            </Row>
          }

          <Row>
            <Col>
              <Form onSubmit={this.submit.bind(this)}>
                <Label for="listingTitle">Listing Title</Label>
                <Input
                  autoFocus
                  value={this.state.title}
                  onChange={e => { this.setState({ title: e.target.value }) }}
                  type="text"
                  name="listingTitle"
                  id="listingTitle"
                  placeholder="What's this place called?"/>
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
