import './Slider.css'

import React from 'react'
import PropTypes from 'prop-types'
import SlickSlider from 'react-slick'

import { Icon } from '../Icon'

import { a11yClick } from '../../utils/a11y'

const Prev = props => {
  return (
    <div
      role="button"
      onClick={props.onClick}
      onKeyPress={a11yClick(props.onClick)}
      className="slider-prev"
      tabIndex="0"
    >
      <div className="slider-navigation">
        <Icon iconKey="chevron_left" className="icon-button-overlay" />
      </div>
    </div>
  )
}

const Next = props => {
  return (
    <div
      role="button"
      onClick={props.onClick}
      onKeyPress={a11yClick(props.onClick)}
      className="slider-next"
      tabIndex="0"
    >
      <div className="slider-navigation">
        <Icon iconKey="chevron_right" className="icon-button-overlay" />
      </div>
    </div>
  )
}

const Slider = props => {
  const { slides, initialSlide, ...rest } = props

  return (
    <SlickSlider
      key={initialSlide}
      afterChange={props.afterChange}
      nextArrow={<Next />}
      prevArrow={<Prev />}
      dots={true}
      infinite={true}
      initialSlide={initialSlide >= 0 ? initialSlide : 0}
      slidesToShow={1}
      speed={0}
      {...rest}
    >
      {slides}
    </SlickSlider>
  )
}

Slider.propTypes = {
  initialSlide: PropTypes.number,
}

Slider.defaultProps = {
  initialSlide: 0,
}

export default Slider
