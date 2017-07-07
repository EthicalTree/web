import React from 'react'
import { connect } from 'react-redux'

import { ConfirmModal } from './Modal'
import { confirmProxy } from '../../actions/confirm'

const GenericConfirmModal = props => {
  const { dispatch, confirm } = props

  return (
    <ConfirmModal
      className="confirm-modal small-modal"
      contentLabel="Logout"
      loading={confirm.isLoading}
      isOpen={confirm.isOpen}
      onRequestClose={e => { dispatch({ type: 'SET_CONFIRM_MODAL', data: false }) }}
      onConfirm={e => { dispatch(confirmProxy(confirm)) }}
      msg={confirm.msg}>

    </ConfirmModal>
  )
}

const select = (state) => {
  return {
    confirm: state.confirm
  }
}

export default connect(select)(GenericConfirmModal)
