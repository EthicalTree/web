import { getGeoLocation } from '../utils/location'
import { stringToBool } from '../utils/url'
import { deserializeEthicalities } from '../utils/ethicalities'

const defaultSearch = {
  currentPage: 1,
  featured: [],
  featuredListingsLoading: true,
  hoveredResult: null,
  isLoading: true,
  isPending: false,
  listings: null,
  location: {},
  nelat: null,
  nelng: null,
  swlat: null,
  swlng: null,
  located: false,
  matches: 0,
  pageCount: 0,
  query: '',
  openNow: false,
  resultMode: 'listing',
  selectedEthicalities: [],
  selectedResult: null,
}

const search = (state = defaultSearch, { type, data }) => {
  switch (type) {
    case 'TOGGLE_SEARCH_RESULTS_MODE':
      return {
        ...state,
        resultMode: state.resultMode === 'map' ? 'listing' : 'map',
      }
    case 'SET_SELECTED_SEARCH_RESULT':
      return { ...state, selectedResult: data }
    case 'SET_SEARCH_RESULT_HOVER':
      return { ...state, hoveredResult: data }
    case 'SET_SEARCH_PENDING':
      return { ...state, isPending: data }
    case 'SET_SEARCH_LOCATION':
      if (data !== state.location) {
        return {
          ...state,
          location: data,
          page: 1,
          nelat: '',
          nelng: '',
          swlat: '',
          swlng: '',
        }
      }

      return { ...state, location: data }
    case 'SET_SEARCH_QUERY_PARAMS': {
      let ethicalities = deserializeEthicalities(data.ethicalities)
      const latlng = getGeoLocation()

      return {
        ...state,
        query: data.query === undefined ? state.query : data.query,
        currentPage: parseInt(data.page, 10) || state.currentPage,
        selectedEthicalities: ethicalities || state.selectedEthicalities,
        openNow:
          data.openNow === undefined
            ? state.openNow
            : stringToBool(data.openNow),
        nelat: data.nelat === undefined ? state.nelat : data.nelat,
        nelng: data.nelng === undefined ? state.nelng : data.nelng,
        swlat: data.swlat === undefined ? state.swlat : data.swlat,
        swlng: data.swlng === undefined ? state.swlng : data.swlng,
        lat: latlng ? latlng.lat : '',
        lng: latlng ? latlng.lng : '',
      }
    }
    case 'SET_SEARCH_LOADING':
      return { ...state, isLoading: data }
    case 'SET_SEARCH_RESULTS': {
      const { listings, located, pageCount, currentPage, matches } = data

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
