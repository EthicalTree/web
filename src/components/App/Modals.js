import React from 'react'

import GenericConfirmModal from '../Global/GenericConfirmModal'
import FullScreenImageModal from '../Global/FullScreenImageModal'

import {
  AddListingModal,
  EditDescriptionModal,
  EditLocationModal,
  EditOperatingHoursModal,
  EditEthicalitiesModal
} from '../Listing'

import {
  LoginModal,
  LogoutModal,
  SignupModal,
  VerifyEmailModal,
  ForgotPasswordModal
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
      <EditOperatingHoursModal />
      <EditEthicalitiesModal />

      <GenericConfirmModal />
      <FullScreenImageModal />
      <ForgotPasswordModal />
    </div>
  )
}

export default Modals
