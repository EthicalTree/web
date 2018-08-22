import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools'
import rootReducer from '../reducers'
import DevTools from '../root/DevTools'
import middlewares from '../utils/reduxMiddlewares'

const enhancer = compose(
  applyMiddleware(...middlewares),
  DevTools.instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
)

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)
  return store
}
