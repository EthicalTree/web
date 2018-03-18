import 'react-toggle/style.css'
import './Toggle.css'

import React from 'react'
import ReactToggle from 'react-toggle'

export const Toggle = (props) => {
  const onChange = e => {
    props.onChange(e.target.checked)
  }
  return (
    <ReactToggle
      className="et-toggle"
      {...props}
      onChange={onChange}
    />
  )
}
