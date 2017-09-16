import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../Global'

import {
  Form,
  FormGroup,
  Input,
  Button,
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap'

import { sendForgotPasswordRequest } from '../../actions/session'

class ForgotPasswordModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      email: ''
    }
  }

  submit(e) {
    const { dispatch } = this.props
    e.preventDefault();

    dispatch(sendForgotPasswordRequest(this.state.email))
  }

  render() {
    const { session } = this.props

    return (
      <Modal
        className="forgot-password-modal small-modal"
        loading={session.forgotPasswordLoading}
        contentLabel="Forgot Passord"
        modalName="forgot_password"
      >

        <Container>
          {session.sendForgotPasswordError &&
            <Row>
              <Col>
                <Alert color="danger">
                  {session.sendForgotPasswordError}
                </Alert>
              </Col>
            </Row>
          }

          {!session.sendForgotPasswordError &&
            <Row className="text-center">
              <Col>
                <p>
                  Don't worry about it! Enter your email address below and
                  we'll send you a link to recover it.
                </p>
              </Col>
            </Row>
          }

          <Row className="mt-3 mb-3">
            <Col>
              <Form method="post" onSubmit={this.submit.bind(this)}>
                <FormGroup>
                  <Input
                    autoFocus
                    value={this.state.email}
                    onChange={e => { this.setState({ email: e.target.value }) }}
                    type="email"
                    name="email"
                    id="forgotPasswordEmail"
                    placeholder="Enter your email address..."/>
                </FormGroup>

                <FormGroup className="mt-4">
                  <Button block color="primary" role="button" type="submit">
                    Send
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
    session: state.session
  }
}

export default connect(select)(ForgotPasswordModal)
