import store from '../store/store'

export const getSeoText = (field, defaultText = '') => {
  const state = store.getState()
  const { seoPaths } = state.app

  const pathname = window.location.pathname.toLowerCase()
  const seoPath = seoPaths[pathname] || seoPaths[`${pathname}/`]

  if (seoPath) {
    return seoPath[field] || defaultText
  }

  return defaultText
}
