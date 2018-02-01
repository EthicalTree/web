import React from 'react'
import { render } from 'react-dom'
import reduxStore from './store/store'
import Root from './root/Root'

render(
  <Root store={reduxStore}/>,
  document.getElementById('root')
);

