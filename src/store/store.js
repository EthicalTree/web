import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import { DevTools } from '../components/DevTools'
import reduxMiddlewares from '../utils/reduxMiddlewares'

let enhancer

if (process.env.NODE_ENV === 'development') {
  enhancer = compose(
    applyMiddleware(...reduxMiddlewares),
    DevTools.instrument(),
  )
} else {
  enhancer = applyMiddleware(...reduxMiddlewares)
}

export default createStore(rootReducer, {}, enhancer)

