const defaultState = {
  errors: null,
  fullScreenCurrenImage: null,
  fullScreenImages: null,
  isLoading: false,
  modalData: {},
  openModal: null
}

const modal = (state=defaultState, {type, data}) => {

  switch (type) {
    case 'SET_FULLSCREEN_MODAL_IMAGES':
      return {...state, fullScreenImages: data}
    case 'SET_FULLSCREEN_MODAL_CURRENT_IMAGE':
      return {...state, fullScreenCurrentImage: data}
    case 'SET_MODAL_ERRORS':
      return {...state, errors: data}
    case 'SET_MODAL_LOADING':
      return {...state, isLoading: data}
    case 'UPDATE_MODAL_DATA':
      return {...state, modalData: {...state.modalData, ...data}}
    case 'OPEN_MODAL':
      return {...state, openModal: data}
    case 'CLOSE_MODAL':
      return {
        ...state,
        openModal: null,
        errors: null,
        modalData: {},
        isLoading: false
      }
    default:
      return state
  }

}

export default modal
