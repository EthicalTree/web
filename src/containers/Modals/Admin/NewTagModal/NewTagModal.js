import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../../Modal'

import {
  Form,
  Label,
  Input,
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap'

import { addTag } from '../../../../actions/admin'

class AddListingModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      hashtag: '',
      useType: 'category'
    }
  }

  submit(e) {
    e.preventDefault()
    const { dispatch } = this.props

    dispatch(addTag(this.state))
  }

  render() {
    const { modal } = this.props

    return (
      <Modal
        className="add-tag-modal small-modal"
        loading={modal.isLoading}
        contentLabel="Add New Tag"
        onSave={this.submit.bind(this)}
        modalName="add_tag"
        saveLabel="Create"
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
            <Col>
              <Form onSubmit={this.submit.bind(this)}>
                <Label for="tag">Hashtag</Label>
                <Input
                  autoFocus
                  value={this.state.hashtag}
                  onChange={e => { this.setState({ hashtag: e.target.value }) }}
                  type="text"
                  name="tag"
                  id="tag"
                  placeholder="#restaurant"
                />
              </Form>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form onSubmit={this.submit.bind(this)}>
                <Label for="tag">Use Type</Label>
                <Input
                  onChange={e => { this.setState({ useType: e.target.value }) }}
                  type="select"
                  name="useType"
                  id="useType"
                >
                  <option>category</option>
                  <option>admin</option>
                </Input>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal>
    )
  }

}

const select = (state) => ({
  admin: state.admin,
  modal: state.modal
})

export default connect(select)(AddListingModal)
