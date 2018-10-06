import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../../Modal'

import { Form, Label, Input, Row, Col } from 'reactstrap'

import { addSeoPath, editSeoPath } from '../../../../actions/admin'

class EditSeoPathModal extends React.Component {
  submit = () => {
    const { dispatch } = this.props
    const { id } = this.state

    if (id) {
      dispatch(editSeoPath(this.state))
    } else {
      dispatch(addSeoPath(this.state))
    }
  }

  constructor(props) {
    super(props)

    const seoPath = props.modal.modalData
    this.state = seoPath
  }

  render() {
    const { modal } = this.props
    const { path, title, description, header } = this.state

    return (
      <Modal
        className="admin-edit-seo-path-modal large-modal"
        loading={modal.isLoading}
        contentLabel="Edit SEO Path"
        onSave={this.submit}
        modalName="admin-edit-seo-path"
        saveLabel="Save"
      >
        <Form>
          <Row>
            <Col>
              <Label for="path">Path</Label>
              <Input
                autoFocus
                value={path}
                onChange={e => {
                  this.setState({ path: e.target.value })
                }}
                type="text"
                name="path"
                id="path"
                placeholder="ex. '/collections/my-collection'"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Label for="title">Title</Label>
              <Input
                value={title}
                onChange={e => {
                  this.setState({ title: e.target.value })
                }}
                type="text"
                name="title"
                id="title"
                placeholder="Custom title for SEO"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Label for="description">Description</Label>
              <Input
                value={description}
                onChange={e => {
                  this.setState({ description: e.target.value })
                }}
                type="text"
                name="description"
                id="description"
                placeholder="Custom description for SEO"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Label for="header">Header</Label>
              <Input
                value={header}
                onChange={e => {
                  this.setState({ header: e.target.value })
                }}
                type="text"
                name="header"
                id="header"
                placeholder="Custom header for SEO (if page supports it)"
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

const select = state => ({
  admin: state.admin,
  modal: state.modal,
})

export default connect(select)(EditSeoPathModal)
