import ReactGA from 'react-ga'
import history from './history'
import store from '../store/store'

const GA_CODE = process.env.REACT_APP_GA_CODE

if (GA_CODE) {
  ReactGA.initialize(process.env.REACT_APP_GA_CODE)
}

export const trackPageView = (options) => {
  const state = store.getState()
  const user = options && options.user ? options.user : state.session.user
  const url = window.location.pathname + window.location.search

  if (user && user.admin) {
    return
  }

  if (GA_CODE) {
    ReactGA.set({
      page: window.location.pathname,
      url,
      user
    })

    ReactGA.pageview(url)
  }
}

history.listen(location => {
  trackPageView()
})

