const defaultSearch = {
  query: '',
  selectedEthicalities: []
}

const search = (state=defaultSearch, action) => {

  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {...state, query: action.data}
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
