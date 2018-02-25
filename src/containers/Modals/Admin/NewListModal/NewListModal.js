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

import { addList, editList } from '../../../../actions/admin'

class NewListModal extends React.Component {

  submit(e) {
    e.preventDefault()
    const { dispatch, modal } = this.props

    if (modal.modalData.id) {
      dispatch(editList(modal.modalData))
    }
    else {
      dispatch(addList(modal.modalData))
    }
  }

  handleChange(obj) {
    const { dispatch } = this.props
    dispatch({ type: 'UPDATE_MODAL_DATA', data: obj })
  }

  render() {
    const { modal } = this.props
    const { name, hashtag, description } = modal.modalData
    const isUpdate = !!modal.modalData.id

    return (
      <Modal
        className="add-list-modal medium-modal"
        loading={modal.isLoading}
        contentLabel={isUpdate ? 'Edit List' : 'Add New List'}
        onSave={this.submit.bind(this)}
        modalName="new-list"
        saveLabel={isUpdate ? 'Save' : 'Create'}
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
                  value={name || ''}
                  onChange={e => this.handleChange({ name: e.target.value }) }
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter a name"
                />
              </Col>
              <Col size={6}>
                <Label for="description">Hashtag</Label>
                <Input
                  onChange={e => { this.handleChange({ hashtag: e.target.value }) }}
                  type="text"
                  name="hashtag"
                  value={hashtag || ''}
                  id="hashtag"
                  placeholder="Enter a tag"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <Label for="description">Description</Label>
                <Input
                  onChange={e => { this.handleChange({ description: e.target.value }) }}
                  type="textarea"
                  value={description || ''}
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
