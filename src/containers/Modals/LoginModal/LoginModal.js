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
  Alert
} from 'reactstrap'

import { login } from '../../../actions/session'

class LoginModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  submit(e) {
    const { dispatch } = this.props
    e.preventDefault();

    dispatch(login(this.state))
    this.setState({ password: '' })
  }

  openForgotPassword(e) {
    const { dispatch } = this.props
    e.preventDefault()

    dispatch({ type: 'OPEN_MODAL', data: 'forgot-password' })
  }

  render() {
    const { session, modal } = this.props

    return (
      <Modal
        className="login-modal small-modal"
        loading={modal.isLoading}
        contentLabel="Login"
        modalName="login"
      >
        {session.loginInfo &&
          <Row>
            <Col>
              <Alert color="success">
                {session.loginInfo}
              </Alert>
            </Col>
          </Row>
        }

        <Row>
          <Col>
            <Form method="post" onSubmit={this.submit.bind(this)}>
              <FormGroup>
                <Label for="loginEmail">Email Address</Label>
                <Input
                  autoFocus
                  value={this.state.email}
                  onChange={e => { this.setState({ email: e.target.value }) }}
                  type="email"
                  name="email"
                  id="loginEmail"
                  placeholder="Enter email..."/>
              </FormGroup>

              <FormGroup>
                <Label for="loginPassword">Password</Label>
                <Input
                  value={this.state.password}
                  onChange={e => { this.setState({ password: e.target.value }) }}
                  type="password"
                  name="password"
                  id="loginPassword"
                  placeholder="Enter password..." />
              </FormGroup>

              <FormGroup className="mt-4">
                <Button block color="primary" role="button" type="submit">
                  Login
                </Button>
              </FormGroup>

              <div className="text-center mb-3">
                <a
                  href=""
                  onClick={this.openForgotPassword.bind(this)}
                >
                  Forgot your password?
                </a>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal>
    )
  }

}

const select = (state) => {
  return {
    modal: state.modal,
    session: state.session
  }
}

export default connect(select)(LoginModal)
