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

import { addList } from '../../../../actions/admin'

class NewListModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      hashtag: '',
      location: 'front_page',
    }
  }

  submit(e) {
    e.preventDefault()
    const { dispatch } = this.props

    dispatch(addList(this.state))
  }

  render() {
    const { modal } = this.props

    return (
      <Modal
        className="add-list-modal medium-modal"
        loading={modal.isLoading}
        contentLabel="Add New List"
        onSave={this.submit.bind(this)}
        modalName="add_list"
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

          <Form onSubmit={this.submit.bind(this)}>
            <Row>
              <Col size={6}>
                <Label for="name">Name</Label>
                <Input
                  autoFocus
                  value={this.state.name}
                  onChange={e => { this.setState({ name: e.target.value }) }}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter a name"
                />
              </Col>
              <Col size={6}>
                <Label for="description">Hashtag</Label>
                <Input
                  onChange={e => { this.setState({ hashtag: e.target.value }) }}
                  type="text"
                  name="hashtag"
                  id="hashtag"
                  placeholder="Enter a tag"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <Label for="description">Description</Label>
                <Input
                  onChange={e => { this.setState({ description: e.target.value }) }}
                  type="textarea"
                  name="description"
                  id="description"
                />
              </Col>
            </Row>

            <Row className="mt-3">

            </Row>
          </Form>
        </Container>
      </Modal>
    )
  }

}

const select = (state) => ({
  admin: state.admin,
  modal: state.modal
})

export default connect(select)(NewListModal)
