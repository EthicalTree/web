import React from 'react'
import ReactDOM from 'react-dom'
import reduxStore from '../../store/store'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App store={reduxStore} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
