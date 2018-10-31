import React from 'react'
import etLogo from '../../components/Header/images/et-logo.svg'

import './LoadingPage.css'

const LoadingPage = () => {
  return (
    <div className="et-loading-page">
      <img src={etLogo} alt="Loading" width="128px" />
    </div>
  )
}

export default LoadingPage
