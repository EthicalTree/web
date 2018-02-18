import ReactGA from 'react-ga'

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize(process.env.REACT_APP_GA_CODE)
}

const logPageView = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: window.location.pathname + window.location.search  })
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  return null
}

export {
  ReactGA,
  logPageView
}
