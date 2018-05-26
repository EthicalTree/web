const defaultState = {
  name: '',
  description: '',
  featuredListings: null,
  hashtag: '',
  listings: [],
  isLoading: true,
  totalPages: 1,
  currentPage: 1,
  slug: ''
}

const curatedList = (state=defaultState, { type, data }) => {

  switch (type) {
    case 'SET_GET_CURATED_LIST_LOADING':
      return {...state, isLoading: data}
    case 'SET_CURATED_LIST':
      return {...state, ...data}
    default:
      return state
  }

}

export default curatedList
