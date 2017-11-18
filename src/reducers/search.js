const defaultSearch = {
  query: '',
  selectedEthicalities: [],
  listings: [],
  currentPage: 0,
  hoveredResult: null
}

const search = (state=defaultSearch, action) => {

  switch (action.type) {
    case 'SET_SEARCH_RESULT_HOVER':
      return {...state, hoveredResult: action.data}
    case 'SET_SEARCH_QUERY':
      return {...state, query: action.data || ''}
    case 'SET_SEARCH_LOADING':
      return {...state, isSearchLoading: action.data}
    case 'SET_SEARCH_RESULTS':
      const { listings, pageCount, currentPage } = action.data

      return {
        ...state,
        listings,
        pageCount: parseInt(pageCount, 10),
        currentPage: parseInt(currentPage, 10)
      }
    case 'SET_SEARCH_ETHICALITIES':
      return {...state, selectedEthicalities: action.data}
    default:
      return state
  }
}

export default search
