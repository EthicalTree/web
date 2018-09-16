import './FeatureHighlight.css'

import React from 'react'
import classnames from 'classnames'

export class FeatureHighlight extends React.Component {
  render() {
    const { alternate, renderGraphic, renderContent } = this.props

    const className = classnames('feature-highlight', { alternate })

    return (
      <div className={className}>
        <div className="graphic-container">{renderGraphic()}</div>
        <div className="content-container">{renderContent()}</div>
      </div>
    )
  }
}

export default FeatureHighlight
