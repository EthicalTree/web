const defaultSearch = {
  categorySuggestions: [],
  currentPage: 1,
  featured: [],
  featuredListingsLoading: true,
  hoveredResult: null,
  isSearchLoading: true,
  listings: [],
  location: '',
  locationSuggestions: [],
  matches: 0,
  query: '',
  resultMode: 'listing',
  selectedEthicalities: [],
  selectedResult: null,
}

const search = (state=defaultSearch, action) => {

  switch (action.type) {
    case 'TOGGLE_SEARCH_RESULTS_MODE':
      return {...state, resultMode: state.resultMode === 'map' ? 'listing' : 'map'}
    case 'SET_SEARCH_LOCATION':
      return {...state, location: action.data}
    case 'SET_SEARCH_LOCATION_SUGGESTIONS':
      return {...state, locationSuggestions: action.data}
    case 'SET_DEFAULT_SEARCH_LOCATION':
      return {...state, location: !state.location ? action.data : state.location}
    case 'SET_SELECTED_SEARCH_RESULT':
      return {...state, selectedResult: action.data}
    case 'SET_SEARCH_RESULT_HOVER':
      return {...state, hoveredResult: action.data}
    case 'SET_SEARCH_QUERY':
      return {...state, query: action.data || ''}
    case 'SET_SEARCH_LOADING':
      return {...state, isSearchLoading: action.data}
    case 'SET_FEATURED_LISTINGS':
      return {...state, featured: action.data}
    case 'SET_FEATURED_LISTINGS_LOADING':
      return {...state, featuredListingsLoading: action.data}
    case 'SET_SEARCH_RESULTS':
      const { listings, pageCount, currentPage, matches } = action.data

      return {
        ...state,
        currentPage: parseInt(currentPage, 10),
        listings,
        matches,
        pageCount: parseInt(pageCount, 10),
      }
    case 'SET_SEARCH_ETHICALITIES':
      return {...state, selectedEthicalities: action.data}
    default:
      return state
  }
}

export default search
