const defaultSearch = {
  query: '',
  selectedEthicalities: [],
  results: [],
  currentPage: 0
}

const search = (state=defaultSearch, action) => {

  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {...state, query: action.data}
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
    case 'TOGGLE_SEARCH_ETHICALITY':
      let { selectedEthicalities } = state

      if (selectedEthicalities.includes(action.data)) {
        selectedEthicalities = selectedEthicalities.filter(e => e !== action.data)
      }
      else {
        selectedEthicalities = [...selectedEthicalities, action.data]
      }

      return {
        ...state,
        selectedEthicalities
      }
    default:
      return state
  }
}

export default search
