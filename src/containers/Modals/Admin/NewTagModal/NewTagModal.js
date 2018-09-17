import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../../Modal'

import { Form, Label, Input, Row, Col } from 'reactstrap'

import { addTag } from '../../../../actions/admin'

class NewTagModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hashtag: '',
      useType: 'category',
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
        modalName="new-tag"
        saveLabel="Create"
      >
        <Form onSubmit={this.submit.bind(this)}>
          <Row>
            <Col>
              <Label for="tag">Hashtag</Label>
              <Input
                autoFocus
                value={this.state.hashtag}
                onChange={e => {
                  this.setState({ hashtag: e.target.value })
                }}
                type="text"
                name="tag"
                id="tag"
                placeholder="#restaurant"
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Label for="tag">Use Type</Label>
              <Input
                onChange={e => {
                  this.setState({ useType: e.target.value })
                }}
                type="select"
                name="useType"
                id="useType"
              >
                <option>category</option>
                <option>admin</option>
              </Input>
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

export default connect(select)(NewTagModal)
