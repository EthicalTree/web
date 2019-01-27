const defaultState = {
  isPersonalDetailsDirty: false,
  isEditingPassword: false,
  firstName: '',
  lastName: '',
  currentPassword: '************',
  newPassword: '',
  confirmPassword: '',
  ethicalities: [],
}

const account = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_EDIT_PERSONAL_DETAILS_ERRORS':
      return { ...state, editPersonalDetailsErrors: action.data }
    case 'SET_EDIT_ACCOUNT_PASSWORD_ERRORS':
      return { ...state, editPasswordErrors: action.data }
    case 'RESET_PERSONAL_DETAILS': {
      const { firstName, lastName, ethicalities } = action.data

      return {
        ...state,
        firstName,
        lastName,
        ethicalities,
        isPersonalDetailsDirty: false,
      }
    }
    case 'SET_EDITING_ACCOUNT_PASSWORD':
      return {
        ...state,
        isEditingPassword: action.data,
        currentPassword: action.data ? '' : '************',
        newPassword: '',
        confirmPassword: '',
        editPasswordErrors: null,
      }
    case 'SET_ACCOUNT_FIRST_NAME':
      return { ...state, firstName: action.data }
    case 'SET_ACCOUNT_LAST_NAME':
      return { ...state, lastName: action.data }
    case 'SET_ACCOUNT_ETHICALITIES':
      return { ...state, ethicalities: action.data }
    case 'SET_ACCOUNT_CURRENT_PASSWORD':
      return { ...state, currentPassword: action.data }
    case 'SET_ACCOUNT_NEW_PASSWORD':
      return { ...state, newPassword: action.data }
    case 'SET_ACCOUNT_CONFIRM_PASSWORD':
      return { ...state, confirmPassword: action.data }
    case 'SET_PERSONAL_DETAILS_DIRTY':
      return { ...state, isPersonalDetailsDirty: action.data }
    default:
      return state
  }
}

export default account
