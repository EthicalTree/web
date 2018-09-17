import './styles/index.css'
import './styles/globals.css'
import './styles/autosuggest.css'
import './styles/content.css'
import './utils/polyfills.js'

import React from 'react'
import { render } from 'react-dom'
import reduxStore from './store/store'
import App from './containers/App'

render(<App store={reduxStore} />, document.getElementById('root'))
