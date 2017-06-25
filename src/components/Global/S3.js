import React from 'react'
import store from 'store'
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'

const S3Uploader = (props) => {
  const s3Options = {
    signingUrlWithCredentials: true,
    signingUrlHeaders: { Authorization: `Bearer ${store.get('ETHICALTREE_AUTH_TOKEN')}` },
    signingUrlQueryParams: props.signingUrlQueryParams,
    server: `${process.env.REACT_APP_API_URL}`,
  }

  return (
    <DropzoneS3Uploader
      s3Url={`${process.env.REACT_APP_S3_URL}`}
      style={{}}
      onProgress={props.onProgress}
      onFinish={props.onFinish}
      upload={s3Options}>
      {props.children}
    </DropzoneS3Uploader>

  )
}

export default S3Uploader
