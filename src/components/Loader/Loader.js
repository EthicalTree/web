import './Loader.css'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Spinner from 'react-spinkit'

const Loader = (props) => {
  const { loading, progress, className, fixed } = props



  if (loading || progress >= 0) {
    const classNames = classnames(
      'loading',
      className,
      { 'loader-fixed': fixed }
    )

    return (
      <div className={classNames}>
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
        </div>
      </div>
    )
  }

  const classNames = classnames(
    'loader',
    className,
  )

  return (
    <div className={classNames}>
      {props.children}
    </div>
  )
}

Loader.propTypes = {
  className: PropTypes.string,
  fixed: PropTypes.bool
}

Loader.defaultProps = {
  className: '',
  fixed: false
}

export default Loader
