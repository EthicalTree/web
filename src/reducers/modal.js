
const modal = (state={}, action) => {

  switch (action.type) {
    case 'SET_FULLSCREEN_MODAL_IMAGES':
      return {...state, fullScreenImages: action.data}
    case 'SET_FULLSCREEN_MODAL_CURRENT_IMAGE':
      return {...state, fullScreenCurrentImage: action.data}
    case 'OPEN_MODAL':
      return {...state, openModal: action.data}
    case 'CLOSE_MODAL':
      return {...state, openModal: null}
    default:
      return state
  }

}

export default modal
