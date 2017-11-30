import React from 'react'
import { connect } from 'react-redux'
import { Header, Footer } from '../Global'
import { getCurrentUser, getSessionInformation } from '../../actions/session'
import { authenticate } from '../../utils/api'

import { logPageView } from '../RouteActions/GA'
import { ScrollTop } from '../RouteActions/ScrollTop'
import history from '../../utils/history'
import { ConnectedRouter } from 'react-router-redux'

import {
  Route,
  withRouter
} from 'react-router-dom'

import Modals from './Modals'
import FrontPage from '../FrontPage/FrontPage'
import AccountSettings from '../AccountSettings/AccountSettings'
import { ForgotPasswordPage }from '../Session'
import { SearchResults } from '../Search'
import { Listing } from '../Listing'
import Admin from '../Admin/Admin'
import Loader from '../Global/Loader'

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
    const { modal, session, app } = this.props
    const modalOpenClass = !!modal.openModal ? 'modal-open' : ''

    return (
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

                <Route path="/admin" component={Admin} />

                <Footer />
                <Modals />
              </InnerApp>
            }
          </ConnectedRouter>
        </Loader>
      </div>
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

