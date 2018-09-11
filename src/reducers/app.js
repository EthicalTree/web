const defaultState = {
  isAppLoading: false,
  areEthicalitiesLoading: false,
  ethicalities: [],
  plans: [],
}

const app = (state = defaultState, { type, data }) => {
  switch (type) {
    case 'NAVIGATE':
      return { ...state, navToggle: !!state.navToggle }
    case 'SET_LOADING':
      return { ...state, isAppLoading: data }
    case 'SET_GET_ETHICALITIES_LOADING':
      return { ...state, areEthicalitiesLoading: data }
    case 'SET_ETHICALITIES':
      return { ...state, ethicalities: data }
    case 'SET_PLANS':
      return { ...state, plans: data }
    case 'SET_LOCATION':
      return { ...state, location: data }
    default:
      return state
  }
}

export default app
