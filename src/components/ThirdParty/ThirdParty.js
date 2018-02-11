import React from 'react'

export class ThirdParty extends React.Component {
  componentWillMount() {
    const { content } = this.props

    if (process.env.NODE_ENV === 'production') {
      const script = document.createElement("script")
      script.innerHTML = content
      document.body.appendChild(script)
    }
  }

  render() {
    return null
  }
}

export default ThirdParty
