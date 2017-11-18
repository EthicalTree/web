import './PasswordStrength.sass'

import React from 'react'
import PasswordStrength from '@fnando/password_strength'

const Bar = props => {
  const { strength } = props

  return (
    <div className={`bar ${strength}`}></div>
  )
}

const PasswordStrengthWidget = props => {
  const { email, password } = props

  const strength = PasswordStrength.test(email, password)
  const filled = Math.round(strength.score / 20)

  const filledBars = [...Array(filled).keys()].map(i => {
    return <Bar key={i} strength={strength.status} />
  })

  const emptyBars = [...Array(5-filled).keys()].map(i => {
    return <Bar key={i + filled} strength="" />
  })

  return (
    <div className="password-strength">
      {filledBars}
      {emptyBars}
    </div>
  )
}

export default PasswordStrengthWidget
