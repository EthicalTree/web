const defaultState = {
  collections: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false
}

const collections = (state=defaultState, { type, data }) => {

  switch (type) {
    case 'SET_COLLECTIONS_LOADING':
      return {...state, isLoading: data}
    case 'SET_COLLECTIONS':
      return {
        ...state,
        collections: data.collections,
        currentPage: data.currentPage,
        totalPages: data.totalPages
      }
    default:
      return state
  }

}

export default collections
