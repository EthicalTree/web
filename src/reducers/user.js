import { getSavedSearchLocation } from '../utils/address'

const initialState = {
  location: getSavedSearchLocation()
}

const user = (state=initialState, {type, data}) => {

  switch (type) {
    case 'SET_USER_LOCATION':
      return {...state, location: data}
    default:
      return state
  }
}

export default user
