const defaultState = {
  isAppLoading: false,
  areEthicalitiesLoading: false,
  areCuratedListsLoading: false,
  ethicalities: [],
  curatedLists: [],
}

const app = (state=defaultState, { type, data }) => {

  switch (type) {
    case 'NAVIGATE':
      return {...state, navToggle: !!state.navToggle}
    case 'SET_LOADING':
      return {...state, isAppLoading: data}
    case 'SET_GET_ETHICALITIES_LOADING':
      return {...state, areEthicalitiesLoading: data}
    case 'SET_CURATED_LISTS_LOADING':
      return {...state, areCuratedListsLoading: data}
    case 'SET_ETHICALITIES':
      return {...state, ethicalities: data}
    case 'SET_CURATED_LISTS':
      return {...state, curatedLists: data}
    default:
      return state
  }

}

export default app
