import React from 'react'
import { connect } from 'react-redux'
import { Header, Footer } from '../Global'
import { getCurrentUser } from '../../actions/session'
import { authenticate } from '../../utils/api'
import { logPageView } from '../Global/GA'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Modals from './Modals'
import FrontPage from '../FrontPage/FrontPage'
import { SearchResults } from '../Search'
import { Listing } from '../Listing'

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
      <div className="app">
        <Router>
          <div>
            <Route component={logPageView} />

            <Header />
            <Route path="/" exact={true} component={FrontPage} />
            <Route path="/listings/:slug" component={Listing} />
            <Route path="/s/:search" component={SearchResults} />
            <Footer />
            <Modals />
          </div>
        </Router>
      </div>
    )
  }
}

const select = (state) => {
  return {
    session: state.session,
  }
}

export default connect(select)(App)

