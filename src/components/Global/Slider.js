import React from 'react'
import Slider from 'react-slick'

import './Slider.sass'

const Prev = (props) => {
  return (
    <div className="slider-prev fa fa-arrow-circle-left">
    </div>
  )
}

const Next = (props) => {
  return (
    <div className="slider-next fa fa-arrow-circle-right">
    </div>
  )
}

const ETSlider = (props) => {
  const { slides } = props

  return (
    <Slider
      nextArrow={<Next />}
      prevArrow={<Prev />}
      dots={false}
      infinite={true}
      slidesToShow={slides.length}>

      {slides}
    </Slider>
  )
}

export default ETSlider
