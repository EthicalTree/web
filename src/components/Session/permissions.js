const LISTING_PERMISSIONS = [
  'edit-ethicalities',
  'edit-description',
  'edit-location',
  'edit-operating-hours',
  'edit-images'
]

const hasPermission = (session, permission) => {
  if (!session || !session.user) {
    return false;
  }

  const { user } = session

  if (LISTING_PERMISSIONS.includes(permission) && user.can_edit_listing) {
    return true;
  }

  return false;
}

export {
  hasPermission
}
