const defaultState = {
  isSigningUp: false,
  isVerifyingEmail: false,
  location: null,
  user: null,
  userLoading: true,
}

const session = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SESSION_INFO':
      return { ...state, location: action.data && action.data.location }
    case 'SET_LOGIN_INFO':
      return { ...state, loginInfo: action.data }
    case 'SET_VERIFY_EMAIL_LOADING':
      return { ...state, verifyEmailLoading: action.data }
    case 'SET_CHANGE_PASSWORD_ERROR':
      return { ...state, changePasswordError: action.data }
    case 'SET_FORGOT_PASSWORD_ERROR':
      return { ...state, sendForgotPasswordError: action.data }
    case 'SET_FORGOT_PASSWORD_EMAIL':
      return { ...state, forgotPasswordEmail: action.data }
    case 'SET_CHANGE_PASSWORD_LOADING':
      return { ...state, isChangePasswordLoading: action.data }
    case 'LOGIN':
      return {
        ...state,
        loginError: false,
        isLoggingIn: false,
        loginInfo: null,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoggingOut: false,
      }
    case 'SIGNUP':
      return {
        ...state,
        isSigningUp: false,
      }
    case 'VERIFY_EMAIL':
      return {
        ...state,
        isVerifyingEmail: false,
        verifyEmailErrors: null,
      }
    case 'SET_USER_LOADING':
      return { ...state, userLoading: action.data }
    case 'SET_CURRENT_USER':
      return { ...state, user: action.data }
    case 'UPDATE_CURRENT_USER':
      let user = { ...state.user, ...action.data }
      return { ...state, user }
    default:
      return state
  }
}

export default session
