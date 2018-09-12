const defaultState = {
  users: [],
  tags: [],
  listings: [],
  collections: [],
  locations: [],
  currentPage: 1,
  totalPages: 1,
  query: '',
  filters: [],
}

const admin = (state = defaultState, { type, data }) => {
  switch (type) {
    case 'SET_ADMIN_FILTER':
      return { ...state, filters: data }
    case 'SET_ADMIN_SEARCH_QUERY':
      return { ...state, query: data }
    case 'SET_ADMIN_LOADING':
      return { ...state, isAdminLoading: data }
    case 'SET_ADMIN_USERS':
      return { ...state, users: data }
    case 'SET_ADMIN_TAGS':
      return { ...state, tags: data }
    case 'SET_ADMIN_LISTINGS':
      return { ...state, listings: data }
    case 'SET_ADMIN_LISTS':
      return { ...state, collections: data }
    case 'SET_ADMIN_LOCATIONS':
      return { ...state, locations: data }
    case 'SET_ADMIN_PAGINATION':
      return {
        ...state,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      }
    default:
      return state
  }
}

export default admin
