import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import middlewares from '../utils/reduxMiddlewares'

const enhancer = applyMiddleware(...middlewares)

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
