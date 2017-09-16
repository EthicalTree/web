import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../../actions/session'
import { ConfirmModal } from '../Global/Modal'

const LogoutModal = (props) => {
  const { dispatch } = props

  return (
    <ConfirmModal
      className="logout-modal small-modal"
      contentLabel="Logout"
      loading={props.session.logoutLoading}
      onConfirm={e => { dispatch(logout()) }}
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

export default connect(select)(LogoutModal)
