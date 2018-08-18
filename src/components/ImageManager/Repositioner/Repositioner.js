import './Repositioner.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

import { Icon } from '../../Icon'

import { dragClick } from '../../../utils/a11y'

export class Repositioner extends React.Component {
  state = {
    isMouseDown: false,
    startPosition: null,
  }

  reposition = dragClick(event => {
    const { handleReposition } = this.props
    const { isMouseDown, startPosition } = this.state

    if (isMouseDown) {
      const diffX = startPosition.x - event.screenX
      const diffY = startPosition.y - event.screenY

      handleReposition({
        diffX,
        diffY,
      })
    }
  })

  handleMouseDown = dragClick(event => {
    const { offset } = this.props

    const offsetX = offset ? offset.diffX : 0
    const offsetY = offset ? offset.diffY : 0

    this.setState({
      isMouseDown: true,
      startPosition: {
        x: offsetX + event.screenX,
        y: offsetY + event.screenY,
      },
    })
  })

  handleMouseUp = () => {
    this.setState({ isMouseDown: false })
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.reposition)
    document.addEventListener('touchmove', this.reposition)
    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('touchend', this.handleMouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.reposition)
    document.removeEventListener('touchmove', this.reposition)
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('touchend', this.handleMouseUp)
  }

  render() {
    const { handleFinishReposition } = this.props

    return (
      <div
        className="repositioner"
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleMouseDown}>
        <p>Click and drag to reposition</p>

        <Icon iconKey="move" />

        <Button color="default" onClick={handleFinishReposition}>
          Done
        </Button>
      </div>
    )
  }
}

Repositioner.propTypes = {
  handleReposition: PropTypes.func.isRequired,
  handleFinishReposition: PropTypes.func.isRequired,
  offset: PropTypes.object,
}

export default Repositioner
