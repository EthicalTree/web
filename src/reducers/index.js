import { combineReducers } from 'redux'

import session from './session'
import header from './header'
import user from './user'
import listing from './listing'

const rootReducer = combineReducers({
  session,
  header,
  user,
  listing
})

export default rootReducer
