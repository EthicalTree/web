import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { logout } from '../../actions/session'
import { ConfirmModal } from './Modal'

const LogoutModal = (props) => {
  const { dispatch, history } = props

  return (
    <ConfirmModal
      className="logout-modal small-modal"
      contentLabel="Logout"
      loading={props.session.logoutLoading}
      onConfirm={e => { dispatch(logout(history)) }}
      modalName="logout"
      msg="Are you sure you want to log out?"
    >

    </ConfirmModal>
  )
}

const select = (state) => {
  return {
    session: state.session
  }
}

export default withRouter(connect(select)(LogoutModal))
