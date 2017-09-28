import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import reduxStore from './store/store'
import Root from './root/Root'

render(
  <AppContainer>
    <Root store={reduxStore}/>
  </AppContainer>,
  document.getElementById('root')
);

// for hot reloading
if (module.hot) {
  module.hot.accept('./root/Root', () => {
    render(
      <AppContainer>
        <Root store={reduxStore} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
