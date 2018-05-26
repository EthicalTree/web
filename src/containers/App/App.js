import React from 'react'
import querystring from 'querystring'
import { Provider, connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

import { Loader } from '../../components/Loader'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { ScrollToTop } from '../../components/ScrollToTop'
import { FacebookPixel } from '../../components/ThirdParty'
import { DevTools } from '../../components/DevTools';

import Modals from '../Modals'

import { initApp } from '../../actions/app'

import history from '../../utils/history'
import { split } from '../../utils/codesplitting'

class InnerApp extends React.Component {
  handleSkip = () => {
    this.main.focus()
  }

  componentDidMount() {
    const { dispatch, location, user } = this.props
    const queryParams = querystring.parse(location.search.slice(1))

    dispatch(initApp({
      queryParams: {
        ...queryParams,
        location: queryParams.location !== user.city ? queryParams.location : null
      }
    }))
  }

  shouldComponentUpdate(nextProps) {
    const appLoadingChanged = this.props.app.isAppLoading !== nextProps.app.isAppLoading
    const cityChanged = this.props.user.city !== nextProps.user.city
    const pageChanged = this.props.location.pathname !== nextProps.location.pathname

    return appLoadingChanged || cityChanged || pageChanged
  }

  render() {
    const { app, user } = this.props

    return (
      <div className="app">
        <Helmet>
          <title>{`EthicalTree · ${user.city}`}</title>
          <meta property="fb:app_id" content={process.env.REACT_APP_FACEBOOK_ID} />
          <meta property="og:site_name" content="EthicalTree" />
          <meta name="twitter:site" content="@EthicalTree" />
        </Helmet>

        <Loader loading={app.isAppLoading}>
          <Header
            handleSkip={this.handleSkip}
          />

          <main
            ref={main => this.main = main}
            tabIndex="-1"
          >
            <Switch>
              <Route
                exact
                path="/"
                component={split(() => import('../FrontPage/FrontPage'))}
              />

              <Route
                exact
                path="/forgot_password/:token"
                component={split(() => import('../ForgotPasswordPage/ForgotPasswordPage'))}
              />

              <Route
                exact
                path="/listings/:city/:slug"
                component={split(() => import('../Listing/Listing'))}
              />

              <Route
                exact
                path="/listings/:slug"
                component={split(() => import('../Listing/Listing'))}
              />

              <Route
                exact
                path="/s/:query?"
                component={split(() => import('../SearchResults/SearchResults'))}
              />

              <Route
                exact
                path="/collections"
                component={split(() => import('../AllCollectionsPage/AllCollectionsPage'))}
              />

              <Route
                exact
                path="/collections/:slug"
                component={split(() => import('../CuratedListPage/CuratedListPage'))}
              />

              <Route
                exact
                path="/collections/:city/:slug"
                component={split(() => import('../CuratedListPage/CuratedListPage'))}
              />

              <Route
                exact
                path="/account"
                component={split(() => import('../AccountSettings/AccountSettings'))}
              />

              <Route
                exact
                path="/contact-us"
                component={split(() => import('../ContactUs/ContactUs'))}
              />

              <Route
                exact
                path="/terms-of-service"
                component={split(() => import('../TermsOfService/TermsOfService'))}
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

            </Switch>
          </main>

          <Footer />
          <Modals />
        </Loader>

        {process.env.NODE_ENV === 'development' &&
          <DevTools />
        }
      </div>
    )
  }
}

const select = state => ({
  app: state.app,
  user: state.user
})

InnerApp = withRouter(connect(select)(InnerApp))

class App extends React.Component {
  render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <React.Fragment>
            <ScrollToTop />
            <FacebookPixel />
            <InnerApp />
          </React.Fragment>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App

