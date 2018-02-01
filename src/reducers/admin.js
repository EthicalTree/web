const defaultState = {
  users: [],
  tags: []
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
    case 'SET_USER_ADMIN_LOADING':
      return {...state, isUserAdminLoading: action.data}
    case 'SET_TAG_ADMIN_LOADING':
      return {...state, isTagAdminLoading: action.data}
    case 'SET_ADMIN_USERS':
      return {...state, users: action.data}
    case 'SET_ADMIN_TAGS':
      return {...state, tags: action.data}
    default:
      return state
  }

}

export default admin
