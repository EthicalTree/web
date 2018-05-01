import './index.css'
import './utils/polyfills.js'

import React from 'react'
import { render } from 'react-dom'
import reduxStore from './store/store'
import App from './containers/App'
import { Scripts } from './containers/Scripts'

render(
  <App store={reduxStore} />,
  document.getElementById('root')
);

render(
  <Scripts />,
  document.getElementById('scripts')
)

