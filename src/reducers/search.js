const defaultSearch = {
  query: '',
  selectedEthicalities: [],
  selectedTags: [],
  selectedResult: null,
  listings: [],
  currentPage: 0,
  hoveredResult: null,
  location: '',
  locationSuggestions: [],
  searchSuggestions: [],
  resultMode: 'listing'
}

const search = (state=defaultSearch, action) => {

  switch (action.type) {
    case 'TOGGLE_SEARCH_RESULTS_MODE':
      return {...state, resultMode: state.resultMode === 'map' ? 'listing' : 'map'}
    case 'ADD_TAG_TO_SEARCH':
      const tag = action.data
      const selectedTags = state.selectedTags.filter(t => !(t.type === tag.type && t.id === tag.id))
      return {...state, selectedTags: [...selectedTags, tag]}
    case 'REMOVE_TAG_FROM_SEARCH':
      return {...state, selectedTags: state.selectedTags.filter(t => (t.name !== action.data))}
    case 'SET_SEARCH_LOCATION':
      return {...state, location: action.data}
    case 'SET_SEARCH_LOCATION_SUGGESTIONS':
      return {...state, locationSuggestions: action.data}
    case 'SET_SEARCH_SUGGESTIONS':
      return {...state, searchSuggestions: action.data}
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
