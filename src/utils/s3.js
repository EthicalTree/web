const URL = 'https://{}.s3.amazonaws.com'

const BUCKETS = {
  ethicaltree: process.env.REACT_APP_BUCKET,
  thumbnail: process.env.REACT_APP_THUMBNAIL_BUCKET
}

export const s3Url = (bucket, key) => {
  const url = URL.replace('{}', BUCKETS[bucket])
  return `${url}/${key}`
}

