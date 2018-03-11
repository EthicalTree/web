import './Slider.css'

import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import { Icon } from '../Icon'

const Prev = (props) => {
  return (
    <div
      role="button"
      onClick={props.onClick}
      className="slider-prev"
    >
      <div className="slider-navigation">
        <Icon iconKey="chevron_left" className="icon-button-overlay" />
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
        <Icon iconKey="chevron_right" className="icon-button-overlay" />
      </div>
    </div>
  )
}

const ETSlider = (props) => {
  const { slides, initialSlide } = props

  return (
    <Slider
      afterChange={props.afterChange}
      nextArrow={<Next />}
      prevArrow={<Prev />}
      dots={false}
      infinite={true}
      initialSlide={initialSlide >= 0 ? initialSlide : 0 }
      slidesToShow={1}
    >
      {slides}
    </Slider>
  )
}

ETSlider.propTypes = {
  initialSlide: PropTypes.number
}

ETSlider.defaultProps = {
  initialSlide: 0
}

export default ETSlider
