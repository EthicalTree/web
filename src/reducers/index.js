import { combineReducers } from 'redux'

import app from './app'
import session from './session'
import header from './header'
import user from './user'
import listing from './listing'
import confirm from './confirm'
import search from './search'
import modal from './modal'
import permissions from './permissions'

const rootReducer = combineReducers({
  app,
  session,
  header,
  user,
  listing,
  confirm,
  search,
  modal,
  permissions
})

export default rootReducer
