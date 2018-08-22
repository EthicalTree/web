import { getSavedCity, getSavedSearchLocation } from '../utils/address'

const initialState = {
  city: getSavedCity(),
  location: getSavedSearchLocation(),
}

const user = (state = initialState, { type, data }) => {
  switch (type) {
    case 'SET_USER_LOCATION': {
      const { location, city } = data

      return {
        ...state,
        location,
        city: city ? city : getSavedCity(),
      }
    }

    default:
      return state
  }
}

export default user
