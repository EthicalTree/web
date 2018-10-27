import React from 'react'
import { connect } from 'react-redux'

import {
  Form,
  FormGroup,
  Input,
  Button,
  Container,
  Row,
  Col,
  Alert,
} from 'reactstrap'

import { changePassword, checkForgotPassword } from '../../actions/session'
import { PasswordStrength } from '../../components/PasswordStrength'

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      confirmPassword: '',
    }
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch(checkForgotPassword(match.params.token))
  }

  submit(e) {
    const { dispatch, match, history } = this.props
    e.preventDefault()

    dispatch(changePassword(this.state, match.params.token, history))
  }

  render() {
    const { session } = this.props

    if (session.forgotPasswordEmail === '') {
      return (
        <p className="mt-4 text-center">
          Your password request is invalid or expired.
        </p>
      )
    }

    return (
      <Container className="mt-5 reset-password-container">
        {session.changePasswordError && (
          <Row>
            <Col>
              <Alert color="danger">{session.changePasswordError}</Alert>
            </Col>
          </Row>
        )}

        <Row className="text-center">
          <Col>
            <p>
              Looks like you're having a hard time remembering your password.
              We're not going to tell you how to live your life, but maybe
              consider using a password manager ;)
            </p>
          </Col>
        </Row>

        <Row className="mt-3 mb-3">
          <Col>
            <Form method="post" onSubmit={this.submit.bind(this)}>
              <FormGroup>
                <Input
                  autoFocus
                  value={this.state.email}
                  onChange={e => {
                    this.setState({ password: e.target.value })
                  }}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter a new password..."
                />
              </FormGroup>

              <FormGroup>
                <Input
                  value={this.state.email}
                  onChange={e => {
                    this.setState({ confirmPassword: e.target.value })
                  }}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Re-enter the same password..."
                />
              </FormGroup>

              <PasswordStrength
                email={session.forgotPasswordEmail}
                password={this.state.password}
              />

              <FormGroup className="mt-4">
                <Button block color="primary" role="button" type="submit">
                  Reset Password
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

const select = state => {
  return {
    modal: state.modal,
    session: state.session,
  }
}

export default connect(select)(ForgotPasswordPage)
