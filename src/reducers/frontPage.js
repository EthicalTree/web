const defaultState = {
  areCuratedListsLoading: false,
  curatedLists: [],
}

const frontPage = (state=defaultState, { type, data }) => {

  switch (type) {
    case 'SET_CURATED_LISTS_LOADING':
      return {...state, areCuratedListsLoading: data}
    case 'SET_CURATED_LISTS':
      return {...state, curatedLists: data}
    default:
      return state
  }

}

export default frontPage
