const permissions = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PERMISSIONS':
      return { ...state, isFetchingPermissions: action.data }
    case 'SET_PERMISSIONS':
      let newState = { ...state }
      newState[action.data.key] = action.data.permissions
      return newState
    default:
      return state
  }
}

export default permissions
