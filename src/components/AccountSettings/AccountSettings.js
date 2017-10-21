import './AccountSettings.sass'

import React from 'react'
import { connect } from 'react-redux'

import {
  Container,
  Col
} from 'reactstrap'

const AccountSettings = props => {
  const { dispatch } = props

  return (
    <div
      style={{
      }}
      className="account-settings">

      <Container className="text-center">

      </Container>
    </div>
  )
}

const select = (state) => {
  return {
    accountSettings: state.accountSettings
  }
}

export default connect(select)(AccountSettings)
