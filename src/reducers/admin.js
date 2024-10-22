const defaultState = {
  collections: [],
  currentPage: 1,
  filters: [],
  importExportProgress: null,
  listings: [],
  locations: [],
  query: '',
  seoPaths: [],
  tags: [],
  totalPages: 1,
  users: [],
  params: {}, //extra query params
}

const admin = (state = defaultState, { type, data }) => {
  switch (type) {
    case 'UPDATE_ADMIN_USER': {
      const user = {
        ...state.users.find(u => u.id === data.id),
        ...data,
      }

      return {
        ...state,
        users: [...state.users.filter(u => u.id !== data.id), user],
      }
    }
    case 'SET_ADMIN_FILTER':
      return { ...state, filters: data }
    case 'SET_ADMIN_PARAMS':
      return { ...state, params: data }
    case 'SET_ADMIN_SEARCH_QUERY':
      return { ...state, query: data }
    case 'SET_ADMIN_LOADING':
      return { ...state, isAdminLoading: data }
    case 'SET_ADMIN_IMPORT_EXPORT_PROGRESS':
      return { ...state, importExportProgress: data }
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
    case 'SET_ADMIN_SEO_PATHS':
      return { ...state, seoPaths: data }
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
