import './S3Uploader.css'

import React from 'react'
import PropTypes from 'prop-types'
import store from 'store'
import ReactS3Uploader from 'react-s3-uploader'

export const S3Uploader = props => {
  const { accept, onProgress, onFinish, signingUrlQueryParams } = props

  return (
    <label className="upload-label">
      <ReactS3Uploader
        accept={accept}
        style={{ display: 'none'}}
        signingUrl="/s3/sign"
        signingUrlWithCredentials={false}
        signingUrlHeaders={{ Authorization: `Bearer ${store.get('ETHICALTREE_AUTH_TOKEN')}` }}
        signingUrlQueryParams={signingUrlQueryParams}
        server={`${process.env.REACT_APP_API_URL}`}
        multiple={false}
        onProgress={onProgress}
        onFinish={onFinish}>
      </ReactS3Uploader>
      {props.children}
    </label>
  )
}

S3Uploader.propTypes = {
  accept: PropTypes.string,
  onProgress: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  signingUrlQueryParams: PropTypes.object.isRequired
}

S3Uploader.defaultProps = {
  accept: "*"
}

export default S3Uploader
