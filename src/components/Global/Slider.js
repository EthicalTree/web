import React from 'react'
import Slider from 'react-slick'

import './Slider.sass'

const Prev = (props) => {
  return (
    <div
      role="button"
      tabIndex="0"
      onClick={props.onClick}
      className="slider-prev icon-button-overlay fa fa-arrow-circle-left">
    </div>
  )
}

const Next = (props) => {
  return (
    <div
      role="button"
      tabIndex="0"
      onClick={props.onClick}
      className="slider-next icon-button-overlay fa fa-arrow-circle-right">
    </div>
  )
}

const ETSlider = (props) => {
  const { slides } = props

  return (
    <Slider
      afterChange={props.afterChange}
      nextArrow={<Next />}
      prevArrow={<Prev />}
      dots={false}
      infinite={true}
      slidesToShow={1}>

      {slides}
    </Slider>
  )
}

export default ETSlider
