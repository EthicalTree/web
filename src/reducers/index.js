import { combineReducers } from 'redux'

import session from './session'
import header from './header'
import user from './user'

const rootReducer = combineReducers({
  session,
  header,
  user
})

export default rootReducer
