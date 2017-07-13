
const app = (state={}, action) => {

  switch (action.type) {
    case 'SET_GET_ETHICALITIES_LOADING':
      return {...state, isGettingEthicalities: action.data}
    case 'SET_ETHICALITIES':
      return {...state, ethicalities: action.data}
    default:
      return state
  }

}

export default app
