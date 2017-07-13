import { combineReducers } from 'redux'

import app from './app'
import session from './session'
import header from './header'
import user from './user'
import listing from './listing'
import confirm from './confirm'

const rootReducer = combineReducers({
  app,
  session,
  header,
  user,
  listing,
  confirm
})

export default rootReducer
