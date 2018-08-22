import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import history from './history'

export default [thunk, routerMiddleware(history)]
