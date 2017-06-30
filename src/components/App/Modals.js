import React from 'react'

import {
  AddListingModal,
  EditDescriptionModal,
  EditLocationModal
} from '../Listing'

import {
  LoginModal,
  LogoutModal,
  SignupModal,
  VerifyEmailModal
} from '../Session'

const Modals = (props) => {
  return (
    <div className="modals">
      <LoginModal />
      <LogoutModal />
      <SignupModal />
      <VerifyEmailModal />

      <AddListingModal />
      <EditDescriptionModal />
      <EditLocationModal />
    </div>
  )
}

export default Modals
