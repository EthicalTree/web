import './AccountSettings.css'

import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { EthicalityBar } from '../../components/Ethicality/Ethicality'
import { PasswordStrength } from '../../components/PasswordStrength'
import { Loader } from '../../components/Loader'
import { isLoggedIn } from '../../utils/permissions'
import { toggleSearchEthicalities } from '../../actions/search'

import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Alert,
} from 'reactstrap'

import { changePersonalDetails, changePassword } from '../../actions/account'

class AccountSettings extends React.Component {
  state = {
    personalDetailsLoading: false,
  }
  submitPersonalDetails = e => {
    e.preventDefault()
    const { dispatch, account } = this.props

    this.setState({ personalDetailsLoading: true })
    dispatch(
      changePersonalDetails(
        {
          firstName: account.firstName,
          lastName: account.lastName,
          ethicalities: account.ethicalities,
        },
        () => this.setState({ personalDetailsLoading: false })
      )
    )
  }

  changePassword = e => {
    e.preventDefault()
    const { dispatch, account } = this.props

    dispatch(
      changePassword({
        currentPassword: account.currentPassword,
        newPassword: account.newPassword,
        confirmPassword: account.confirmPassword,
      })
    )
  }

  onEthicalitySelect = slug => {
    const { dispatch, account } = this.props
    dispatch({ type: 'SET_PERSONAL_DETAILS_DIRTY', data: true })
    dispatch({
      type: 'SET_ACCOUNT_ETHICALITIES',
      data: toggleSearchEthicalities(account.ethicalities, slug),
    })
  }

  render() {
    const { dispatch, session, account, app } = this.props
    const { personalDetailsLoading } = this.state

    if (!isLoggedIn()) {
      return <Redirect to="/" />
    }

    if (session.userLoading) {
      return null
    }

    return (
      <Loader loading={personalDetailsLoading}>
        <Helmet>
          <title>{'EthicalTree · Account Settings'}</title>
        </Helmet>

        <div style={{}} className="account-settings">
          <Container className="mt-4">
            <h2 className="text-center">Account Settings</h2>

            <Col className="mt-5" xs="12" md={{ size: 6, offset: 3 }}>
              <Form
                onChange={() =>
                  dispatch({ type: 'SET_PERSONAL_DETAILS_DIRTY', data: true })
                }
                className="pb-3"
                onSubmit={this.submitPersonalDetails}
              >
                <h5>Personal Details</h5>

                {account.editPersonalDetailsErrors && (
                  <Row>
                    <Col>
                      <Alert color="danger">
                        {account.editPersonalDetailsErrors}
                      </Alert>
                    </Col>
                  </Row>
                )}

                <FormGroup className="mt-4">
                  <Label for="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="ex. John"
                    value={account.firstName || ''}
                    onChange={e =>
                      dispatch({
                        type: 'SET_ACCOUNT_FIRST_NAME',
                        data: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup className="mt-4">
                  <Label for="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="ex. Smith"
                    value={account.lastName || ''}
                    onChange={e =>
                      dispatch({
                        type: 'SET_ACCOUNT_LAST_NAME',
                        data: e.target.value,
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Ethical Preferences</Label>
                  <EthicalityBar
                    className={'justify-content-center'}
                    showLabels={true}
                    showTooltips={false}
                    showIcons={true}
                    ethicalities={app.ethicalities}
                    onEthicalitySelect={this.onEthicalitySelect}
                    selectedEthicalities={account.ethicalities}
                  />
                </FormGroup>

                {account.isPersonalDetailsDirty && (
                  <Row className="mt-4">
                    <Col xs="12" sm="6" className="mb-2">
                      <Button
                        block
                        color="default"
                        onClick={() =>
                          dispatch({
                            type: 'RESET_PERSONAL_DETAILS',
                            data: session.user,
                          })
                        }
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button block type="submit" color="primary">
                        Save
                      </Button>
                    </Col>
                  </Row>
                )}
              </Form>

              <hr />

              <Form className="mt-5" onSubmit={this.changePassword}>
                <h5>
                  Password
                  {!account.isEditingPassword && (
                    <Button
                      color="default"
                      size="sm"
                      className="float-right"
                      onClick={() =>
                        dispatch({
                          type: 'SET_EDITING_ACCOUNT_PASSWORD',
                          data: true,
                        })
                      }
                    >
                      Change
                    </Button>
                  )}
                </h5>

                {account.editPasswordErrors && (
                  <Row>
                    <Col>
                      <Alert color="danger">{account.editPasswordErrors}</Alert>
                    </Col>
                  </Row>
                )}

                <FormGroup className="mt-4">
                  <Label for="currentPassword">Current Password</Label>
                  <Input
                    disabled={!account.isEditingPassword}
                    id="currentPassword"
                    type="password"
                    value={account.currentPassword}
                    onChange={e =>
                      dispatch({
                        type: 'SET_ACCOUNT_CURRENT_PASSWORD',
                        data: e.target.value,
                      })
                    }
                    placeholder="Enter your current password..."
                  />
                </FormGroup>

                {account.isEditingPassword && (
                  <div>
                    <FormGroup>
                      <Label for="newPassword">New Password</Label>
                      <Input
                        onChange={e =>
                          dispatch({
                            type: 'SET_ACCOUNT_NEW_PASSWORD',
                            data: e.target.value,
                          })
                        }
                        type="password"
                        name="newPassword"
                        value={account.newPassword}
                        id="newPassword"
                        placeholder="Enter new password..."
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="confirmPassword">Confirm Password</Label>
                      <Input
                        onChange={e =>
                          dispatch({
                            type: 'SET_ACCOUNT_CONFIRM_PASSWORD',
                            data: e.target.value,
                          })
                        }
                        type="password"
                        name="confirmPassword"
                        value={account.confirmPassword}
                        id="confirmPassword"
                        placeholder="Confirm your new password..."
                      />
                    </FormGroup>

                    <PasswordStrength
                      email={session.user.email}
                      password={account.newPassword}
                    />
                    <Row className="mt-4">
                      <Col xs="12" sm="6" className="mb-2">
                        <Button
                          block
                          color="default"
                          onClick={() =>
                            dispatch({
                              type: 'SET_EDITING_ACCOUNT_PASSWORD',
                              data: false,
                            })
                          }
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col xs="12" sm="6">
                        <Button block type="submit" color="primary">
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Form>
            </Col>
          </Container>
        </div>
      </Loader>
    )
  }
}

const select = state => {
  return {
    session: state.session,
    account: state.account,
    app: state.app,
  }
}

export default connect(select)(AccountSettings)
