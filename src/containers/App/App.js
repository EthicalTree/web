import React from 'react'
import { Provider, connect } from 'react-redux'
import { getCurrentUser, getSessionInformation } from '../../actions/session'
import { authenticate } from '../../utils/api'

import history from '../../utils/history'
import { ConnectedRouter } from 'react-router-redux'

import {
  Route,
  withRouter
} from 'react-router-dom'

import Loader from '../../components/Global/Loader'
import { Header, Footer } from '../../components/Global'
import { ForgotPasswordPage }from '../../components/Session'
import { SearchResults } from '../../components/Search'
import { Listing } from '../../components/Listing'
import { ScrollTop } from '../../components/RouteActions/ScrollTop'
import { logPageView } from '../../components/RouteActions/GA'
import { DevTools } from '../../components/DevTools';

import AccountSettings from '../../components/AccountSettings/AccountSettings'
import FrontPage from '../FrontPage'
import { AdminPage } from '../Admin'
import Modals from '../Modals'

class _InnerApp extends React.Component {
  constructor(props) {
    super(props)

    const { dispatch } = props

    props.history.listen(location => {
      dispatch({ type: "ROUTE_HAS_CHANGED" })
    })
  }

  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    )
  }
}

const InnerApp = withRouter(_InnerApp)

class App extends React.Component {

  componentWillMount() {
    const { dispatch, session } = this.props

    if (session.authToken) {
      authenticate(session.authToken)
      dispatch(getCurrentUser())
    } else {
      dispatch({ type: 'SET_USER_LOADING', data: false })
    }

    dispatch(getSessionInformation())
  }

  render() {
    const { modal, session, app, store } = this.props
    const modalOpenClass = !!modal.openModal ? 'modal-open' : ''

    return (
      <Provider store={store}>
        <div className={`app ${modalOpenClass}`}>
          <Loader loading={session.userLoading || app.isAppLoading}>
            <ConnectedRouter history={history}>
              {!session.userLoading &&
                <InnerApp {...this.props}>
                  <Route component={logPageView} />
                  <Route component={ScrollTop} />



                  <Header />

                  <Route path="/" exact={true} component={FrontPage} />
                  <Route path="/forgot_password/:token" component={ForgotPasswordPage} />
                  <Route path="/listings/:slug" component={Listing} />
                  <Route path="/s/:query?" component={SearchResults} />

                  <Route path="/account" exact={true} component={AccountSettings} />

                  <Route path="/admin" component={AdminPage} />

                  <Footer />
                  <Modals />
                </InnerApp>
              }
            </ConnectedRouter>

            {process.env.NODE_ENV === 'development' &&
              <DevTools />
            }
          </Loader>
        </div>
      </Provider>
    )
  }
}

const select = (state) => {
  return {
    session: state.session,
    app: state.app,
    modal: state.modal
  }
}

export default connect(select)(App)

