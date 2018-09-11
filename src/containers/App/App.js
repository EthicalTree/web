import React from 'react'
import querystring from 'querystring'
import { Provider, connect } from 'react-redux'

import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

import { Loader } from '../../components/Loader'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { ScrollToTop } from '../../components/ScrollToTop'
import { FacebookPixel } from '../../components/ThirdParty'
import { DevTools } from '../../components/DevTools'
import { VerifyEmail } from '../../containers/VerifyEmail'

import Modals from '../Modals'

import { initApp } from '../../actions/app'

import history from '../../utils/history'
import { split } from '../../utils/codesplitting'
import BugsnagErrorBoundary from '../../utils/bugsnag'
import { isToolbarEnabled } from '../../utils/config'

class InnerApp extends React.Component {
  handleSkip = () => {
    this.main.focus()
  }

  componentDidMount() {
    const { dispatch, location } = this.props
    const queryParams = querystring.parse(location.search.slice(1))

    dispatch(
      initApp({
        queryParams: {
          ...queryParams,
          location: queryParams.location,
        },
      })
    )
  }

  shouldComponentUpdate(nextProps) {
    const { app, location, session } = this.props

    const appLoadingChanged = app.isAppLoading !== nextProps.app.isAppLoading
    const pageChanged = location.pathname !== nextProps.location.pathname
    const userChanged = session.user !== nextProps.session.user

    return appLoadingChanged || pageChanged || userChanged
  }

  render() {
    const { app } = this.props

    return (
      <div className="app">
        <Loader loading={app.isAppLoading}>
          <Header handleSkip={this.handleSkip} />

          <main ref={main => (this.main = main)} tabIndex="-1">
            <Switch>
              <Route
                exact
                path="/"
                component={split(() => import('../FrontPage/FrontPage'))}
              />

              <Route
                exact
                path="/verify-email"
                component={VerifyEmail}
              />

              <Route
                exact
                path="/forgot_password/:token"
                component={split(() =>
                  import('../ForgotPasswordPage/ForgotPasswordPage')
                )}
              />

              <Route
                exact
                path="/listings/:city/:slug"
                component={split(() => import('../Listing/Listing'))}
              />

              <Route
                exact
                path="/s/:query?"
                component={split(() =>
                  import('../SearchResultsPage/SearchResultsPage')
                )}
              />

              <Route
                exact
                path="/collections/:city"
                component={split(() =>
                  import('../AllCollectionsPage/AllCollectionsPage')
                )}
              />

              <Route
                exact
                path="/collections/:city/:slug"
                component={split(() =>
                  import('../CollectionPage/CollectionPage')
                )}
              />

              <Route
                exact
                path="/account"
                component={split(() =>
                  import('../AccountSettings/AccountSettings')
                )}
              />

              <Route
                exact
                path="/contact-us"
                component={split(() => import('../ContactUs/ContactUs'))}
              />

              <Route
                exact
                path="/terms-of-service"
                component={split(() =>
                  import('../TermsOfService/TermsOfService')
                )}
              />

              <Route
                exact
                path="/faq"
                component={split(() => import('../FAQ/FAQ'))}
              />

              <Route
                exact
                path="/about-us"
                component={split(() => import('../AboutUs/AboutUs'))}
              />

              <Route
                path="/admin"
                component={split(() => import('../Admin/AdminPage/AdminPage'))}
              />

              <Route
                path="/"
                component={split(() =>
                  import('../../components/Status/Status404/Status404')
                )}
              />
            </Switch>
          </main>

          <Footer />
          <Modals />
        </Loader>

        {isToolbarEnabled() && <DevTools />}
      </div>
    )
  }
}

const select = state => ({
  app: state.app,
  session: state.session,
})

InnerApp = withRouter(connect(select)(InnerApp))

class App extends React.Component {
  render() {
    const { store } = this.props

    return (
      <BugsnagErrorBoundary>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <React.Fragment>
              <ScrollToTop />
              <FacebookPixel />
              <InnerApp />
            </React.Fragment>
          </ConnectedRouter>
        </Provider>
      </BugsnagErrorBoundary>
    )
  }
}

export default App
