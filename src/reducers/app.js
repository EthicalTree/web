const defaultState = {
  isAppLoading: false
}

const app = (state=defaultState, action) => {

  switch (action.type) {
    case 'NAVIGATE':
      return {...state, navToggle: !!state.navToggle}
    case 'SET_LOADING':
      return {...state, isAppLoading: action.data}
    case 'SET_GET_ETHICALITIES_LOADING':
      return {...state, isGettingEthicalities: action.data}
    case 'SET_ETHICALITIES':
      return {...state, ethicalities: action.data}
    default:
      return state
  }

}

export default app
