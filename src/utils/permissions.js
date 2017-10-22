import store from '../store/store'

export const hasPermission = (permission, object={}) => {
  const permissions = object.permissions || {}
  return permissions[permission]
}

export const isLoggedIn = () => {
  const session = store.getState().session
  return !session.userLoading && session.user && session.user.id
}

export const isAdmin = () => {
  const session = store.getState().session
  return isLoggedIn() && !!session.user.admin
}

