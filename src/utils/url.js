
export const isCurrentPath = path => {
  const paths = Array.isArray(path) ? path : [path]

  return !!paths.filter(
    p => window.location.pathname.startsWith(p)
  ).length
}
