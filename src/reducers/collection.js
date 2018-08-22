const defaultState = {
  name: '',
  description: '',
  featuredListings: null,
  hashtag: '',
  listings: [],
  isLoading: true,
  totalPages: 1,
  currentPage: 1,
  slug: '',
}

const collection = (state = defaultState, { type, data }) => {
  switch (type) {
    case 'SET_GET_COLLECTION_LOADING':
      return { ...state, isLoading: data }
    case 'SET_COLLECTION':
      return { ...state, ...data }
    default:
      return state
  }
}

export default collection
