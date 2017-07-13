import React from 'react'

import GenericConfirmModal from '../Global/GenericConfirmModal'

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
      <EditOperatingHoursModal />
      <EditEthicalitiesModal />

      <GenericConfirmModal />
    </div>
  )
}

export default Modals
