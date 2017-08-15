import ReactGA from 'react-ga'

ReactGA.initialize(process.env.REACT_APP_GA_CODE)

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search  })
  ReactGA.pageview(window.location.pathname + window.location.search)
  return null
}

export {
  ReactGA,
  logPageView
}
