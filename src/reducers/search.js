import { concat } from 'ramda'

const defaultSearch = {
  categorySuggestions: [],
  currentPage: 1,
  featured: [],
  featuredListingsLoading: true,
  hoveredResult: null,
  isSearchLoading: true,
  isSearchPending: false,
  listings: [],
  location: '',
  nelat: null,
  nelng: null,
  swlat: null,
  swlng: null,
  located: false,
  locationSuggestions: [],
  matches: 0,
  pageCount: 0,
  query: '',
  resultMode: 'listing',
  selectedEthicalities: [],
  selectedResult: null,
}

const search = (state=defaultSearch, {type, data}) => {

  switch (type) {
    case 'TOGGLE_SEARCH_RESULTS_MODE':
      return {...state, resultMode: state.resultMode === 'map' ? 'listing' : 'map'}
    case 'SET_SEARCH_LOCATION_SUGGESTIONS':
			// set near me as the top result if geolocation is available
			const nearMe = {
				name: 'Near Me',
			};
			const suggested = concat([nearMe], data);
      return {...state, locationSuggestions: suggested}
    case 'SET_DEFAULT_SEARCH_LOCATION':
      return {...state, location: !state.location ? data : state.location}
    case 'SET_SELECTED_SEARCH_RESULT':
      return {...state, selectedResult: data}
    case 'SET_SEARCH_RESULT_HOVER':
      return {...state, hoveredResult: data}
    case 'SET_SEARCH_PENDING':
      return {...state, isPending: data}
    case 'SET_SEARCH_QUERY_PARAMS': {
      let ethicalities = data.ethicalities

      if (ethicalities && !Array.isArray(ethicalities)) {
        ethicalities = ethicalities.split(',')
      }

      return {
        ...state,
        query: data.query === undefined ? state.query : data.query,
        currentPage: data.page || state.currentPage,
        location: data.location || state.location,
        selectedEthicalities: ethicalities || state.selectedEthicalities,
        nelat: data.nelat === undefined ? state.nelat : data.nelat,
        nelng: data.nelng === undefined ? state.nelng : data.nelng,
        swlat: data.swlat === undefined ? state.swlat : data.swlat,
        swlng: data.swlng === undefined ? state.swlng : data.swlng,
      }
    }
    case 'SET_SEARCH_LOADING':
      return {...state, isSearchLoading: data}
    case 'SET_FEATURED_LISTINGS': {
      const { listings, location } = data
      return {
        ...state,
        featured: listings,
        directoryLocation: location
      }
    }
    case 'SET_FEATURED_LISTINGS_LOADING':
      return {...state, featuredListingsLoading: data}
    case 'SET_SEARCH_RESULTS': {
      const {
        listings,
        located,
        pageCount,
        currentPage,
        matches
      } = data

      return {
        ...state,
        currentPage: parseInt(currentPage, 10),
        listings,
        located,
        matches,
        pageCount: parseInt(pageCount, 10),
      }
    }
    default:
      return state
  }
}

export default search
