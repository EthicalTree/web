import React from 'react'
import store from 'store'
import ReactS3Uploader from 'react-s3-uploader'

import './S3.sass'

const S3Uploader = (props) => {
  return (
    <label className="upload-label">
      <ReactS3Uploader
        style={{ display: 'none'}}
        signingUrl="/s3/sign"
        signingUrlWithCredentials={true}
        signingUrlHeaders={{ Authorization: `Bearer ${store.get('ETHICALTREE_AUTH_TOKEN')}` }}
        signingUrlQueryParams={props.signingUrlQueryParams}
        server={`${process.env.REACT_APP_API_URL}`}
        multiple={false}
        onProgress={props.onProgress}
        onFinish={props.onFinish}>
      </ReactS3Uploader>
      {props.children}
    </label>

  )
}

export default S3Uploader
