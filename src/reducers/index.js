import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import account from './account'
import admin from './admin'
import app from './app'
import collections from './collections'
import confirm from './confirm'
import collection from './collection'
import header from './header'
import listing from './listing'
import modal from './modal'
import permissions from './permissions'
import search from './search'
import session from './session'
import user from './user'

const rootReducer = combineReducers({
  account,
  admin,
  app,
  collections,
  confirm,
  collection,
  header,
  listing,
  modal,
  permissions,
  search,
  session,
  user,
  router: routerReducer
})

export default rootReducer
