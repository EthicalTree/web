import store from 'store'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store/configureStore'
import Root from './root/Root'

import './utils/api'

const reduxStore = configureStore({
  session: {
    authToken: store.get('ETHICALTREE_AUTH_TOKEN')
  }
})

render(
  <AppContainer>
    <Root store={reduxStore}/>
  </AppContainer>,
  document.getElementById('root')
);

// for hot reloading
if (module.hot) {
  module.hot.accept('./root/Root', () => {
    const RootContainer = require('./root/Root').default
    render(
      <AppContainer>
        <RootContainer store={store} />
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
