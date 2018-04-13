import React from 'react'
import ReactPixel from 'react-facebook-pixel'
import { withRouter } from 'react-router-dom'

const FacebookId = process.env.REACT_APP_FACEBOOK_ID

export class FacebookPixel extends React.Component {
  componentDidMount() {
    if (FacebookId) {
      ReactPixel.init(FacebookId)
      ReactPixel.pageView()
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props

    if (FacebookId && location !== prevProps.location) {
      ReactPixel.pageView()
    }
  }

  render() {
    return null
  }
}

export default withRouter(FacebookPixel)
