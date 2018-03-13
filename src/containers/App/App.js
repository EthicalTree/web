import React from 'react'
import { Provider, connect } from 'react-redux'

import { trackPageView } from '../../utils/ga'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

import AccountSettings from '../../components/AccountSettings/AccountSettings'
import { Loader } from '../../components/Loader'
import { Header, Footer } from '../../components/Global'
import { ForgotPasswordPage }from '../../components/Session'
import { SearchResults } from '../../components/Search'
import { Listing } from '../../components/Listing'
import { ScrollToTop } from '../../components/ScrollToTop'
import { DevTools } from '../../components/DevTools';

import FrontPage from '../FrontPage'
import { AdminPage } from '../Admin'
import Modals from '../Modals'

import { getCurrentUser, getSessionInformation } from '../../actions/session'
import { getEthicalities } from '../../actions/app'

import history from '../../utils/history'
import { authenticate } from '../../utils/api'

class InnerApp extends React.Component {
  componentWillMount() {
    const { dispatch, session } = this.props

    if (session.authToken) {
      authenticate(session.authToken)
      dispatch(getCurrentUser())
    } else {
      dispatch({ type: 'SET_USER_LOADING', data: false })
      trackPageView()
    }

    dispatch(getSessionInformation())
    dispatch(getEthicalities())
  }

  render() {
    const { app, modal } = this.props
    const modalOpenClass = !!modal.openModal ? 'modal-open' : ''

    return (
      <div className={`app ${modalOpenClass}`}>
        <Loader loading={app.isAppLoading}>
          <Header />

          <main>
            <Switch>
              <Route path="/" exact={true} component={FrontPage} />
              <Route path="/forgot_password/:token" component={ForgotPasswordPage} />
              <Route path="/listings/:slug" component={Listing} />
              <Route path="/s/:query?" component={SearchResults} />

              <Route path="/account" exact={true} component={AccountSettings} />

              <Route path="/admin" component={AdminPage} />
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
  session: state.session,
  app: state.app,
  modal: state.modal
})

InnerApp = withRouter(connect(select)(InnerApp))

class App extends React.Component {
  render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ScrollToTop>
            <InnerApp />
          </ScrollToTop>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App

