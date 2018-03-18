import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../Modal'
import { PasswordStrength } from '../../../components/PasswordStrength'

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from 'reactstrap'

import { signup } from '../../../actions/session'

class SignupModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }

  }

  submit(e) {
    const { dispatch } = this.props
    e.preventDefault()

    dispatch(signup(this.state))
  }

  render() {
    const { modal } = this.props

    return (
      <Modal
        className="signup-modal small-modal"
        loading={modal.isLoading}
        contentLabel="Signup"
        modalName="signup"
      >
        <Row>
          <Col>
            <Form method="post" onSubmit={this.submit.bind(this)}>
              <FormGroup>
                <Label for="signupEmail">Email Address</Label>
                <Input
                  autoFocus
                  value={this.state.email}
                  onChange={e => { this.setState({ email: e.target.value }) }}
                  type="email"
                  name="email"
                  id="signupEmail"
                  placeholder="Enter email..."/>
              </FormGroup>

              <FormGroup>
                <Label for="signupPassword">Password</Label>
                <Input
                  value={this.state.password}
                  onChange={e => { this.setState({ password: e.target.value }) }}
                  type="password"
                  name="password"
                  id="signupPassword"
                  placeholder="Enter password..."
                />
              </FormGroup>

              <FormGroup>
                <Label for="signupPasswordConfirm">Confirm Password</Label>
                <Input
                  value={this.state.confirmPassword}
                  onChange={e => { this.setState({ confirmPassword: e.target.value }) }}
                  type="password"
                  name="confirmPassword"
                  id="signupConfirmPassword"
                  placeholder="Enter password again..." />
              </FormGroup>

              <PasswordStrength
                email={this.state.email}
                password={this.state.password}
              />

              <FormGroup className="mt-4">
                <Button block color="primary" role="button" type="submit">
                  Sign me up!
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
    modal: state.modal,
    session: state.session
  }
}

export default connect(select)(SignupModal)
