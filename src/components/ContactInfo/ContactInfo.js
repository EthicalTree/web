import './ContactInfo.css'

import React from 'react'
import { Icon } from '../Icon'

export const ContactInfo = () => {
  return (
    <div className="contact-info">
      <div className="d-flex mb-3">
        <Icon iconKey="email" />
        <a href="mailto: info@ethicaltree.com">info@ethicaltree.com</a>
      </div>
    </div>
  )
}

export default ContactInfo
