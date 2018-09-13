import ReactGA from 'react-ga'
import history from './history'
import store from '../store/store'

const GA_CODE = process.env.REACT_APP_GA_CODE

if (GA_CODE) {
  ReactGA.initialize(process.env.REACT_APP_GA_CODE)
}

const getCurrentUser = () => {
  const state = store.getState()
  return state.session.user
}

export const trackPageView = options => {
  const url = window.location.pathname + window.location.search
  const user = options && options.user ? options.user : getCurrentUser()

  if (user && user.admin) {
    return
  }

  if (GA_CODE) {
    ReactGA.set({
      page: window.location.pathname,
      url,
      user,
    })

    ReactGA.pageview(url)
  }
}

export const trackEvent = options => {
  const { action, category, label, value } = options
  const user = getCurrentUser()

  if (user && user.admin) {
    return
  }

  ReactGA.event({
    action,
    category,
    label,
    value,
  })
}

history.listen(() => {
  trackPageView()
})
