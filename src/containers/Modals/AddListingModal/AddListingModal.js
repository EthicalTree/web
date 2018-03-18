import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Modal } from '../Modal'

import {
  Form,
  Label,
  Input,
  Row,
  Col
} from 'reactstrap'

import { addListing } from '../../../actions/listing'

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
    const { modal } = this.props

    return (
      <Modal
        className="add-description-modal small-modal"
        loading={modal.isLoading}
        contentLabel="Add New Listing"
        onSave={this.submit.bind(this)}
        modalName="add-listing"
        saveLabel="Create"
      >
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

export default withRouter(connect(select)(AddListingModal))
