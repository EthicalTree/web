
const session = (state={}, action) => {

  switch (action.type) {
    case 'SET_LOGIN_INFO':
      return {...state, loginInfo: action.data}
    case 'SET_FORGOT_PASSWORD_LOADING':
      return {...state, forgotPasswordLoading: action.data}
    case 'SET_LOGIN_LOADING':
      return {...state, loginLoading: action.data}
    case 'SET_SIGNUP_LOADING':
      return {...state, signupLoading: action.data}
    case 'SET_VERIFY_EMAIL_LOADING':
      return {...state, verifyEmailLoading: action.data}
    case 'SET_CHANGE_PASSWORD_ERROR':
      return {...state, changePasswordError: action.data}
    case 'SET_FORGOT_PASSWORD_ERROR':
      return {...state, sendForgotPasswordError: action.data}
    case 'SET_FORGOT_PASSWORD_EMAIL':
      return {...state, forgotPasswordEmail: action.data}
    case 'SET_CHANGE_PASSWORD_LOADING':
      return {...state, isChangePasswordLoading: action.data}
    case 'SET_LOGIN_ERROR':
      return {...state, loginError: "Invalid email/password"}
    case 'SET_SIGNUP_ERROR':
      return {...state, signupErrors: action.data}
    case 'SET_VERIFY_EMAIL_ERROR':
      return {...state, verifyEmailErrors: action.data}
    case 'LOGIN':
      return {
        ...state,
        loginError: false,
        isLoggingIn: false,
        loginInfo: null,
        authToken: action.data.jwt,
      }
    case 'LOGOUT':
      return {
        ...state,
        authToken: null,
        user: null,
        isLoggingOut: false,
      }
    case 'SIGNUP':
      return {
        ...state,
        isSigningUp: false,
        signupErrors: null
      }
    case 'VERIFY_EMAIL':
      return {
        ...state,
        isVerifyingEmail: false,
        verifyEmailErrors: null
      }
    case 'SET_USER_LOADING':
      return {...state, userLoading: action.data}
    case 'SET_CURRENT_USER':
      return {
        user: action.data.user
      }
    default:
      return state
  }

}

export default session
