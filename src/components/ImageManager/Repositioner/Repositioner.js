import './Repositioner.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

import { Icon } from '../../Icon'

export class Repositioner extends React.Component {
  state = {
    isMouseDown: false,
    startPosition: null
  }

  reposition = event => {
    const { handleReposition } = this.props
    const { isMouseDown, startPosition } = this.state

    event.preventDefault()

    if (isMouseDown) {
      const diffX = startPosition.x - event.screenX
      const diffY = startPosition.y - event.screenY

      handleReposition({
        diffX,
        diffY
      })
    }
  }

  handleMouseDown = event => {
    const { offset } = this.props

    const offsetX = offset ? offset.diffX : 0
    const offsetY = offset ? offset.diffY : 0

    this.setState({
      isMouseDown: true,
      startPosition: {
        x: offsetX + event.screenX,
        y: offsetY + event.screenY
      }
    })
  }

  handleMouseUp = () => {
    this.setState({ isMouseDown: false })
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.reposition)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.reposition)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    const { handleFinishReposition } = this.props

    return (
      <div
        className="repositioner"
        onMouseDown={this.handleMouseDown}
      >
        <p>Click and drag to reposition</p>

        <Icon iconKey="move" />

        <Button
          color="default"
          onClick={handleFinishReposition}
        >
          Done
        </Button>
      </div>
    )
  }
}

Repositioner.propTypes = {
  handleReposition: PropTypes.func.isRequired,
  handleFinishReposition: PropTypes.func.isRequired,
  offset: PropTypes.object
}

export default Repositioner
