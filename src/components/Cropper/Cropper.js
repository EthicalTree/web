import './Cropper.css'
import 'cropperjs/dist/cropper.css'

import React from 'react'
import PropTypes from 'prop-types'
import ReactCropper from 'react-cropper'

export class Cropper extends React.Component {
  handleCrop = () => {
    const { handleCrop } = this.props
    handleCrop(this.cropper.getData())
  }

  render() {
    const { handleCrop, src, ...rest } = this.props

    return (
      <ReactCropper
        ref={el => this.cropper = el ? el.cropper : null}
        src={src}
        crop={this.handleCrop}
        movable={false}
        zoomable={false}
        {...rest}
      />
    )
  }
}

Cropper.propTypes = {
  handleCrop: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
}

export default Cropper
