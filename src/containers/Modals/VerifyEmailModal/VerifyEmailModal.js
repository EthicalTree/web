import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../Modal'

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from 'reactstrap'

import { verifyEmail } from '../../../actions/session'

class VerifyEmailModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      token: ''
    }
  }

  submit(e) {
    const { dispatch } = this.props
    e.preventDefault()

    dispatch(verifyEmail(this.state))
  }

  render() {
    const { session } = this.props

    return (
      <Modal
        className="verify-email small-modal"
        loading={session.verifyEmailLoading}
        contentLabel="Verify Email"
        modalName="verify-email"
      >
        <Row>
          <Col>
            <p>
              Almost there! We sent a 6 digit token to your email address.
              Enter that token here to verify your account!
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form method="post" onSubmit={this.submit.bind(this)}>
              <FormGroup>
                <Label for="verifyEmailToken">Token</Label>
                <Input
                  value={this.state.token}
                  onChange={e => { this.setState({ token: e.target.value }) }}
                  type="text"
                  name="verifyEmailToken"
                  id="verifyEmailToken"
                  placeholder="- - - - - -" />
              </FormGroup>

              <FormGroup className="mt-4">
                <Button block color="primary" role="button" type="submit">
                  Verify me, baby!
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Modal>
    )
  }

}

const select = (state) => {
  return {
    session: state.session
  }
}

export default connect(select)(VerifyEmailModal)
