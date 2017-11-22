import './Slider.sass'

import React from 'react'
import Slider from 'react-slick'

const Prev = (props) => {
  return (
    <div
      role="button"
      onClick={props.onClick}
      className="slider-prev"
    >
      <div className="slider-navigation">
        <i className="icon-button-overlay fa fa-chevron-left" />
      </div>
    </div>
  )
}

const Next = (props) => {
  return (
    <div
      role="button"
      onClick={props.onClick}
      className="slider-next"
    >
      <div className="slider-navigation">
        <i className="icon-button-overlay fa fa-chevron-right" />
      </div>
    </div>
  )
}

const ETSlider = (props) => {
  const { slides } = props

  return (
    <Slider
      adaptiveHeight={true}
      afterChange={props.afterChange}
      nextArrow={<Next />}
      prevArrow={<Prev />}
      dots={false}
      infinite={true}
      slidesToShow={1}
    >
      {slides}
    </Slider>
  )
}

export default ETSlider
