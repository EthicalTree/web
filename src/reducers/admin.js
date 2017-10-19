const defaultState = {
  users: []
}

const admin = (state=defaultState, action) => {

  switch (action.type) {
    case 'UPDATE_ADMIN_USER':
      const user = {
        ...state.users.find(u => u.id === action.data.id),
        ...action.data
      }

      return {
        ...state,
        users: [...state.users.filter(u => u.id !== action.data.id), user]
      }
    case 'SET_ADMIN_LOADING':
      return {...state, isAdminLoading: action.data}
    case 'SET_ADMIN_USERS':
      return {...state, users: action.data}
    default:
      return state
  }

}

export default admin
