import React from 'react'
import PropTypes from 'prop-types'
import ContentLoader from 'react-content-loader'

const Skeleton = ({ children, ...contentLoaderProps }) => (
  <ContentLoader {...contentLoaderProps}>{children}</ContentLoader>
)

Skeleton.propTypes = {
  children: PropTypes.node.isRequired,
  primaryColor: PropTypes.string,
  primaryOpacity: PropTypes.number,
  secondaryColor: PropTypes.string,
  secondaryOpacity: PropTypes.number,
  speed: PropTypes.number,
  preserveAspectRatio: PropTypes.string,
}

Skeleton.defaultProps = {
  primaryColor: '#898989', //background
  primaryOpacity: 0.08,
  secondaryColor: '#606060', //animation
  secondaryOpacity: 0.18,
  speed: 2,
  preserveAspectRatio: 'none',
}

export default Skeleton
