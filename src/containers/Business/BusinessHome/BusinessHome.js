import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Advertise } from '../Advertise'

export class BusinessHome extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/business/advertise" component={Advertise} />
        <Redirect to="/" />
      </Switch>
    )
  }
}

export default BusinessHome
