import React from 'react'
import { connect } from 'react-redux'

import { GenericConfirmModal } from './GenericConfirmModal'
import { FullScreenImageModal } from './FullScreenImageModal'

import { AddListingModal } from './AddListingModal'
import { EditDescriptionModal } from './EditDescriptionModal'
import { EditLocationModal } from './EditLocationModal'
import { EditOperatingHoursModal } from './EditOperatingHoursModal'
import { EditEthicalitiesModal } from './EditEthicalitiesModal'

import { LoginModal } from './LoginModal'
import { LogoutModal } from './LogoutModal'
import { SignupModal } from './SignupModal'
import { VerifyEmailModal } from './VerifyEmailModal'
import { ForgotPasswordModal } from './ForgotPasswordModal'

import { FeedbackModal } from './FeedbackModal'

import {
  NewTagModal,
  NewCollectionModal,
  EditListingModal as EditAdminListingModal,
  EditLocationModal as EditAdminLocationModal,
  NewLocationModal as NewAdminLocationModal,
  EditSeoPathModal,
} from './Admin'

const modals = {
  login: LoginModal,
  logout: LogoutModal,
  signup: SignupModal,
  'verify-email': VerifyEmailModal,
  'add-listing': AddListingModal,
  'edit-description': EditDescriptionModal,
  'edit-location': EditLocationModal,
  'edit-operating-hours': EditOperatingHoursModal,
  'edit-ethicalities': EditEthicalitiesModal,
  confirm: GenericConfirmModal,
  'fullscreen-image': FullScreenImageModal,
  'forgot-password': ForgotPasswordModal,
  'new-tag': NewTagModal,
  'new-collection': NewCollectionModal,
  'admin-edit-listing': EditAdminListingModal,
  'admin-edit-location': EditAdminLocationModal,
  'admin-new-location': NewAdminLocationModal,
  'admin-edit-seo-path': EditSeoPathModal,
  feedback: FeedbackModal,
}

const Modals = props => {
  const { modal } = props
  const OpenModal = modals[modal.openModal]

  if (OpenModal) {
    return (
      <div className="modals">
        <OpenModal />
      </div>
    )
  }

  return null
}

const select = state => ({
  modal: state.modal,
})

export default connect(select)(Modals)
