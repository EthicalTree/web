const defaultState = {
  isPersonalDetailsDirty: false,
  isEditingPassword: false,
  firstName: '',
  lastName: ''
}

const account = (state=defaultState, action) => {

  switch (action.type) {
    case 'SET_EDIT_PERSONAL_DETAILS_ERRORS':
      return {...state, editPersonalDetailsErrors: action.data}
    case 'RESET_PERSONAL_DETAILS':
      const { firstName, lastName } = action.data

      return {
        ...state,
        firstName,
        lastName,
        isPersonalDetailsDirty: false
      }
    case 'SET_EDITING_PASSWORD':
      return {...state, isEditingPassword: action.data}
    case 'SET_ACCOUNT_FIRST_NAME':
      return {...state, firstName: action.data}
    case 'SET_ACCOUNT_LAST_NAME':
      return {...state, lastName: action.data}
    case 'SET_PERSONAL_DETAILS_DIRTY':
      return {...state, isPersonalDetailsDirty: action.data}
    default:
      return state
  }

}

export default account
