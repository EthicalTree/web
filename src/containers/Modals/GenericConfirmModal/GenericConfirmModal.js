import React from 'react'
import { connect } from 'react-redux'

import { ConfirmModal } from '../Modal'
import { confirmProxy } from '../../../actions/confirm'

const GenericConfirmModal = props => {
  const { dispatch, confirm } = props

  return (
    <ConfirmModal
      className="confirm-modal small-modal"
      contentLabel={confirm.title || 'Confirm'}
      loading={confirm.isLoading}
      modalName="confirm"
      onConfirm={() => {
        dispatch(confirmProxy(confirm))
      }}
      msg={confirm.msg}
    />
  )
}

const select = state => {
  return {
    confirm: state.confirm,
  }
}

export default connect(select)(GenericConfirmModal)
