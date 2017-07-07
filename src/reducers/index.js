import { combineReducers } from 'redux'

import session from './session'
import header from './header'
import user from './user'
import listing from './listing'
import confirm from './confirm'

const rootReducer = combineReducers({
  session,
  header,
  user,
  listing,
  confirm
})

export default rootReducer
