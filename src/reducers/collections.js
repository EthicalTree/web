const defaultState = {
  collections: [],
  isLoading: false
}

const collections = (state=defaultState, { type, data }) => {

  switch (type) {
    case 'SET_COLLECTIONS_LOADING':
      return {...state, isLoading: data}
    case 'SET_COLLECTIONS':
      return {...state, collections: data}
    default:
      return state
  }

}

export default collections
