import React from 'react'

import GenericConfirmModal from './GenericConfirmModal'
import FullScreenImageModal from './FullScreenImageModal'

import AddListingModal from './AddListingModal'
import EditDescriptionModal from './EditDescriptionModal'
import EditLocationModal from './EditLocationModal'
import EditOperatingHoursModal from './EditOperatingHoursModal'
import EditEthicalitiesModal from './EditEthicalitiesModal'

import LoginModal from './LoginModal'
import LogoutModal from './LogoutModal'
import SignupModal from './SignupModal'
import VerifyEmailModal from './VerifyEmailModal'
import ForgotPasswordModal from './ForgotPasswordModal'

import { NewTagModal } from './Admin'

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

      <NewTagModal />
    </div>
  )
}

export default Modals
