const defaultState = {
  users: [],
  tags: [],
  listings: [],
  lists: {
    frontPage: {
      data: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false
    }
  },
  currentPage: 1,
  totalPages: 1
}

const admin = (state=defaultState, {type, data}) => {

  switch (type) {
    case 'UPDATE_ADMIN_USER':
      const user = {
        ...state.users.find(u => u.id === data.id),
        ...data
      }

      return {
        ...state,
        users: [...state.users.filter(u => u.id !== data.id), user]
      }

    case 'SET_ADMIN_LOADING':
      return {...state, isAdminLoading: data}
    case 'SET_ADMIN_USERS':
      return {...state, users: data}
    case 'SET_ADMIN_TAGS':
      return {...state, tags: data}
    case 'SET_ADMIN_LISTINGS':
      return {...state, listings: data}
    case 'SET_ADMIN_LISTS':
      return {...state, lists: data}
    case 'SET_ADMIN_PAGINATION':
      return {
        ...state,
        currentPage: data.currentPage,
        totalPages: data.totalPages
      }
    default:
      return state
  }

}

export default admin
