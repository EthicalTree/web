import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../Modal'
import { PasswordStrength } from '../../../components/PasswordStrength'
import { PhoneNumber } from '../../../components/PhoneNumber'
import { EthicalityBar } from '../../../components/Ethicality/Ethicality'
import { toggleSearchEthicalities } from '../../../actions/search'

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
      contactNumber: '',
      position: '',
      selectedEthicalities: [],
    }
  }

  submit(e) {
    const { dispatch } = this.props
    e.preventDefault()

    dispatch(signup(this.state))
  }

  onEthicalitySelect = slug => {
    const { selectedEthicalities } = this.state
    this.setState({
      selectedEthicalities: toggleSearchEthicalities(
        selectedEthicalities,
        slug
      ),
    })
  }

  render() {
    const { modal, app } = this.props
    const { claimId } = this.state
    const { modalData } = modal

    const {
      confirmPassword,
      email,
      firstName,
      lastName,
      password,
      contactNumber,
      position,
      selectedEthicalities,
    } = this.state

    return (
      <Modal
        className="signup-modal extra-large-modal"
        loading={modal.isLoading}
        contentLabel="Signup"
        modalName="signup"
      >
        <Row>
          <Col>
            <Form method="post" onSubmit={this.submit.bind(this)}>
              <Row>
                <Col sm="6">
                  <FormGroup>
                    <Label for="signupEmail">Email Address *</Label>
                    <Input
                      autoFocus
                      value={email}
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
                      value={firstName}
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
                      value={lastName}
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

              {modalData.isBusinessOwnerSignup && (
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label for="contactNumber">Contact Number *</Label>
                      <PhoneNumber
                        value={contactNumber}
                        onChange={contactNumber =>
                          this.setState({ contactNumber })
                        }
                      />
                    </FormGroup>
                  </Col>

                  <Col sm="6">
                    <FormGroup>
                      <Label for="position">Position</Label>
                      <Input
                        value={position}
                        onChange={e => {
                          this.setState({ position: e.target.value })
                        }}
                        type="text"
                        name="position"
                        id="position"
                        placeholder="Enter your position in company..."
                      />
                    </FormGroup>
                  </Col>
                </Row>
              )}

              <Row>
                <Col sm="6">
                  <FormGroup>
                    <Label for="signupPassword">Password *</Label>
                    <Input
                      value={password}
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
                      value={confirmPassword}
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

              <PasswordStrength email={email} password={password} />

              {!claimId && (
                <Row className="mt-3">
                  <Col sm="12">
                    <FormGroup>
                      <Label>Ethical Preferences</Label>
                      <EthicalityBar
                        className={'justify-content-center'}
                        showLabels={true}
                        showTooltips={false}
                        showIcons={true}
                        ethicalities={app.ethicalities}
                        onEthicalitySelect={this.onEthicalitySelect}
                        selectedEthicalities={selectedEthicalities}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              )}

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
    app: state.app,
  }
}

export default connect(select)(SignupModal)
