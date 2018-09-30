export const isCurrentPath = path => {
  const paths = Array.isArray(path) ? path : [path]

  return !!paths.filter(p => window.location.pathname.startsWith(p)).length
}

/**
 * Matches either an exact pathname or a path prefix (supports RegEx)
 */
export const urlOneOf = (url, pathList = []) => {
  return pathList.some(p => {
    if (p instanceof RegExp) {
      return p.test(url)
    } else {
      return url === p
    }
  })
}

export const getSitePath = path => {
  return `${process.env.REACT_APP_URL}${path}`
}

export const stringToBool = param => {
  return param === 'true' || param === true
}
