import './Loader.sass'

import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit'

const Loader = (props) => {

  const { loading, progress, className } = props

  if (loading || progress >= 0) {
    return (
      <div className={`loading ${className}`}>
        <div className="et-spinner-wrapper">
          <Spinner
            color="#526173"
            fadeIn="quarter"
            name='cube-grid'
            className="et-spinner"/>

          {progress >= 0 &&
            <span className="loading-progress">{progress}%</span>
          }
        </div>



        <div className="loading-overlay">
        </div>

        <div className="loading-content">
          {props.children}
        </div>
      </div>
    )
  }

  return (
    <div className={`loader ${className}`}>
      {props.children}
    </div>
  )
}

Loader.propTypes = {
  className: PropTypes.string
}

Loader.defaultProps = {
  className: ''
}

export default Loader
