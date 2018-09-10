import React from 'react'
import querystring from 'querystring'
import { connect } from 'react-redux'
import { FrontPage } from '../FrontPage'

export class VerifyEmail extends React.Component {
  componentDidMount() {
    const { dispatch, location } = this.props
    const data = querystring.parse(location.search.slice(1))
    console.log(data)

    dispatch({ type: 'OPEN_MODAL', data: 'verify-email' })
    dispatch({ type: 'UPDATE_MODAL_DATA', data })
  }

  render() {
    return (
      <FrontPage />
    )
  }
}

const select = state => ({})

export default connect(select)(VerifyEmail)
