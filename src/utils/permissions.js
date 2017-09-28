const hasPermission = (permission, object={}) => {
  const permissions = object.permissions || {}
  return permissions[permission]
}

export {
  hasPermission
}
