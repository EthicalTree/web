export const isCurrentPath = path => {
  const paths = Array.isArray(path) ? path : [path]

  return !!paths.filter(p => window.location.pathname.startsWith(p)).length
}

export const getSitePath = path => {
  return `${process.env.REACT_APP_URL}${path}`
}
