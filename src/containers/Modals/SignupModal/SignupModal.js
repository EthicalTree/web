import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../Modal'
import { PasswordStrength } from '../../../components/PasswordStrength'

import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'

import { signup } from '../../../actions/session'

class SignupModal extends React.Component {
  constructor(props) {
    super(props)

    const { modal } = props
    const { modalData } = modal

    this.state = {
      claimId: modalData.claimId,
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      listingSlug: modalData.listingSlug,
      password: '',
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
        className="signup-modal large-modal"
        loading={modal.isLoading}
        contentLabel="Signup"
        modalName="signup">
        <Row>
          <Col>
            <Form method="post" onSubmit={this.submit.bind(this)}>
              <Row>
                <Col sm="6">
                  <FormGroup>
                    <Label for="signupEmail">Email Address *</Label>
                    <Input
                      autoFocus
                      value={this.state.email}
                      onChange={e => {
                        this.setState({ email: e.target.value })
                      }}
                      type="email"
                      name="email"
                      id="signupEmail"
                      placeholder="Enter email..."
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col sm="6">
                  <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                      value={this.state.firstName}
                      onChange={e => {
                        this.setState({ firstName: e.target.value })
                      }}
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="John"
                    />
                  </FormGroup>
                </Col>

                <Col sm="6">
                  <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                      value={this.state.lastName}
                      onChange={e => {
                        this.setState({ lastName: e.target.value })
                      }}
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Smith"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col sm="6">
                  <FormGroup>
                    <Label for="signupPassword">Password *</Label>
                    <Input
                      value={this.state.password}
                      onChange={e => {
                        this.setState({ password: e.target.value })
                      }}
                      type="password"
                      name="password"
                      id="signupPassword"
                      placeholder="Enter password..."
                    />
                  </FormGroup>
                </Col>

                <Col sm="6">
                  <FormGroup>
                    <Label for="signupPasswordConfirm">
                      Confirm Password *
                    </Label>
                    <Input
                      value={this.state.confirmPassword}
                      onChange={e => {
                        this.setState({ confirmPassword: e.target.value })
                      }}
                      type="password"
                      name="confirmPassword"
                      id="signupConfirmPassword"
                      placeholder="Enter password again..."
                    />
                  </FormGroup>
                </Col>
              </Row>

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

const select = state => {
  return {
    modal: state.modal,
    session: state.session,
  }
}

export default connect(select)(SignupModal)
