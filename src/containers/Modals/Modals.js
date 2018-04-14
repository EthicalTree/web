import React from 'react'
import { connect } from 'react-redux'

import { GenericConfirmModal } from './GenericConfirmModal'
import { FullScreenImageModal } from './FullScreenImageModal'

import { AddListingModal } from './AddListingModal'
import { EditDescriptionModal } from './EditDescriptionModal'
import { EditLocationModal } from './EditLocationModal'
import { EditOperatingHoursModal } from './EditOperatingHoursModal'
import { EditEthicalitiesModal } from './EditEthicalitiesModal'
import { CropListingPhoto } from './CropListingPhoto'

import { LoginModal } from './LoginModal'
import { LogoutModal } from './LogoutModal'
import { SignupModal } from './SignupModal'
import { VerifyEmailModal } from './VerifyEmailModal'
import { ForgotPasswordModal } from './ForgotPasswordModal'

import {
  NewTagModal,
  NewListModal,
  EditListingModal as EditAdminListingModal,
  EditLocationModal as EditAdminLocationModal
} from './Admin'

const modals = {
  'login': LoginModal,
  'logout': LogoutModal,
  'signup': SignupModal,
  'verify-email': VerifyEmailModal,
  'add-listing': AddListingModal,
  'crop-listing-photo': CropListingPhoto,
  'edit-description': EditDescriptionModal,
  'edit-location': EditLocationModal,
  'edit-operating-hours': EditOperatingHoursModal,
  'edit-ethicalities': EditEthicalitiesModal,
  'confirm': GenericConfirmModal,
  'fullscreen-image': FullScreenImageModal,
  'forgot-password': ForgotPasswordModal,
  'new-tag': NewTagModal,
  'new-list': NewListModal,
  'admin-edit-listing': EditAdminListingModal,
  'admin-edit-location': EditAdminLocationModal
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
  modal: state.modal
})

export default connect(select)(Modals)
