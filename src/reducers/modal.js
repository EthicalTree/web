const defaultState = {
  errors: null,
  infoMessages: null,
  successMessages: null,
  fullScreenCurrenImage: null,
  fullScreenImages: null,
  isLoading: false,
  modalData: {},
  openModal: null,
}

const modal = (state = defaultState, { type, data }) => {
  switch (type) {
    case 'SET_FULLSCREEN_MODAL_IMAGES':
      return { ...state, fullScreenImages: data }
    case 'SET_FULLSCREEN_MODAL_CURRENT_IMAGE':
      return { ...state, fullScreenCurrentImage: data }
    case 'SET_MODAL_ERRORS':
      return { ...state, errors: data }
    case 'SET_MODAL_INFO_MESSAGES':
      return { ...state, infoMessages: data }
    case 'SET_MODAL_SUCCESS_MESSAGES':
      return { ...state, successMessages: data }
    case 'SET_MODAL_LOADING':
      return { ...state, isLoading: data }
    case 'UPDATE_MODAL_DATA':
      return { ...state, modalData: { ...state.modalData, ...data } }
    case 'OPEN_MODAL':
      return { ...state, openModal: data }
    case 'CLOSE_MODAL':
      return defaultState
    default:
      return state
  }
}

export default modal
