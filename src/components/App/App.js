import React from 'react'
import { connect } from 'react-redux'
import { Header, Footer } from '../Global'
import { getCurrentUser } from '../../actions/session'
import { authenticate } from '../../utils/api'

import { logPageView } from '../RouteActions/GA'

import {
  BrowserRouter as Router,
  Route,
  withRouter
} from 'react-router-dom'

import Modals from './Modals'
import FrontPage from '../FrontPage/FrontPage'
import { SearchResults } from '../Search'
import { Listing } from '../Listing'

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

  componentDidMount() {
    const { dispatch, session } = this.props

    if (session.authToken) {
      authenticate(session.authToken)
      dispatch(getCurrentUser())
    }
  }

  render() {
    return (
      <Router>
        <InnerApp {...this.props}>
          <Route component={logPageView} />

          <Header />
          <Route path="/" exact={true} component={FrontPage} />
          <Route path="/listings/:slug" component={Listing} />
          <Route path="/s/:query?" component={SearchResults} />
          <Footer />
          <Modals />
        </InnerApp>
      </Router>
    )
  }
}

const select = (state) => {
  return {
    session: state.session
  }
}

export default connect(select)(App)

