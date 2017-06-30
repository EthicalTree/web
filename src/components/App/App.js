import React from 'react'
import { connect } from 'react-redux'
import { Header, Footer } from '../Global'
import { getCurrentUser } from '../../actions/session'
import { authenticate } from '../../utils/api'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Modals from './Modals'
import { Listing } from '../Listing'

const TmpRoot = (props) => {
  return (
    <Link to="/listing/1">
      Test Listing!
    </Link>
  )
}

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
            <Header />
            <div className="container">
              <Route path="/" exact={true} component={TmpRoot} />
              <Route path="/listings/:slug" component={Listing} />
            </div>
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

