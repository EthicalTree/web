import React from 'react'
import { connect } from 'react-redux'

import { ConfirmModal } from '../Modal'
import { logout } from '../../../actions/session'

const LogoutModal = (props) => {
  const { dispatch } = props

  return (
    <ConfirmModal
      className="logout-modal small-modal"
      contentLabel="Logout"
      loading={false}
      onConfirm={e => { dispatch(logout()) }}
      modalName="logout"
      msg="Are you sure you want to log out?"
    >

    </ConfirmModal>
  )
}

const select = (state) => ({})

export default connect(select)(LogoutModal)