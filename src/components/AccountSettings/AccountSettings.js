import './AccountSettings.sass'

import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Loader from '../Global/Loader'
import { isLoggedIn } from '../../utils/permissions'

import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Alert
} from 'reactstrap'

import { changePersonalDetails } from '../../actions/account'

class AccountSettings extends React.Component {

  dirtyPersonalDetails = e => {
    e.preventDefault()

    const { dispatch, session, account } = this.props

    const dirtyFirst = session.user.firstName !== account.firstName
    const dirtyLast = session.user.lastName !== account.lastName

    if ((dirtyFirst || dirtyLast) && !account.isPersonalDetailsDirty) {
      dispatch({ type: 'SET_PERSONAL_DETAILS_DIRTY', data: true })
    }
  }

  submitPersonalDetails = e => {
    e.preventDefault()
    const { dispatch, account } = this.props

    dispatch(changePersonalDetails({
      firstName: account.firstName,
      lastName: account.lastName
    }))
  }

  render() {
    const { dispatch, session, account } = this.props

    if (!isLoggedIn()) {
      return <Redirect to="/" />
    }

    return (
      <Loader loading={session.userLoading}>
        <div
          style={{
          }}
          className="account-settings">

          <Container className="mt-4">
            <h2 className="text-center">Account Settings</h2>

            <Col
              className="mt-5"
              xs="12"
              md={{ size: 6, offset: 3 }}
            >
              <Form
                onChange={this.dirtyPersonalDetails}
                className="pb-3"
                onSubmit={this.submitPersonalDetails}
              >
                <h5>Personal Details</h5>

                {account.editPersonalDetailsErrors &&
                  <Row>
                    <Col>
                      <Alert color="danger">
                        {account.editPersonalDetailsErrors}
                      </Alert>
                    </Col>
                  </Row>
                }

                <FormGroup className="mt-4">
                  <Label for="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="ex. John"
                    value={account.firstName || ''}
                    onChange={e => dispatch({ type: 'SET_ACCOUNT_FIRST_NAME', data: e.target.value })}
                  />
                </FormGroup>
                <FormGroup className="mt-4">
                  <Label for="firstName">Last Name</Label>
                  <Input
                    id="firstName"
                    placeholder="ex. Smith"
                    value={account.lastName || ''}
                    onChange={e => dispatch({ type: 'SET_ACCOUNT_LAST_NAME', data: e.target.value })}
                  />
                </FormGroup>

                {account.isPersonalDetailsDirty &&
                  <Row className="mt-4">
                    <Col sm="6">
                      <Button
                        block
                        color="default"
                        onClick={e => dispatch({
                          type: 'RESET_PERSONAL_DETAILS',
                          data: session.user
                        })}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col sm="6">
                      <Button
                        block
                        type="submit"
                        color="primary"
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                }
              </Form>

              <hr />

              <Form className="mt-5">
                <h5>
                  Password
                  <Button color="default" size="sm" className="float-right">Change</Button>
                </h5>

                <FormGroup className="mt-4">
                  <Label for="currentPassword">Current Password</Label>
                  <Input
                    disabled
                    id="currentPassword"
                    value="****************"
                  />
                </FormGroup>
              </Form>
            </Col>

          </Container>
        </div>
      </Loader>
    )
  }

}

const select = (state) => {
  return {
    session: state.session,
    account: state.account
  }
}

export default connect(select)(AccountSettings)
