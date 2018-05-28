const defaultState = {
  areCollectionsLoading: false,
  collections: [],
}

const frontPage = (state=defaultState, { type, data }) => {

  switch (type) {
    case 'SET_COLLECTIONS_LOADING':
      return {...state, areCollectionsLoading: data}
    case 'SET_COLLECTIONS':
      return {...state, collections: data}
    default:
      return state
  }

}

export default frontPage
