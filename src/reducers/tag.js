const defaultState = {
  hashtag: '',
  listings: [],
  isTagLoading: false,
  totalPages: 1,
  currentPage: 1
}

const frontPage = (state=defaultState, { type, data }) => {

  switch (type) {
    case 'SET_GET_TAG_LOADING':
      return {...state, isTagLoading: data}
    case 'SET_CURRENT_TAG':
      return {...state, ...data}
    default:
      return state
  }

}

export default frontPage
