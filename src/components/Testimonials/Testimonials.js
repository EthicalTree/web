import './Testimonials.css'

import React from 'react'
import { Jumbotron } from 'reactstrap'
import { FeatureHighlight } from '../FeatureHighlight'

import nostalgica from './images/nostalgica.png'
import rainbowFoods from './images/rainbow-foods.png'
import growYourRoots from './images/grow-your-roots.png'
import sustainableKingston from './images/sustainable-kingston.jpg'

const TESTIMONIALS = [
  {
    logo: nostalgica,
    quote:
      "Since working with ethicaltree.com we've seen a significant increase in guests that prefer a vegan, vegetarian or gluten-free diet. Ethicaltree.com helps us reach guests that, as we do, think about making conscious sustainable choices.",
    author: 'Dave Breitenherdt from Café Nostalgica',
  },
  {
    logo: rainbowFoods,
    quote:
      'We are incredibly impressed with the level of professionalism and customer service EthicalTree founders provide. Being a supporter of EthicalTree has resulted in an increased level of visibility and exposure within the EthicalTree platform.',
    author:
      'Courtney Saunders from Market Organics and Rainbow Foods Health Food Stores',
  },
  {
    logo: growYourRoots,
    quote:
      "It's wonderful to work with another business that has the same values and goals as you do. As a business owner we are passionate about what we do, so to have another company out there to help promote and share those passions is very valuable!",
    author: 'Melanie Boudens from Grow Your Roots Café',
  },
  {
    logo: sustainableKingston,
    quote:
      'With EthicalTree, you can help ensure you put your money where it counts.',
    author: 'Sustainable Kingston',
  },
]

const Testimonial = props => {
  const { alternate, logo, quote, author } = props

  return (
    <div className="testimonial">
      <FeatureHighlight
        alternate={alternate}
        renderGraphic={() => <img alt="" src={logo} />}
        renderContent={() => (
          <React.Fragment>
            <p className="quote">
              <i>"{quote}"</i>
            </p>
            <small>- {author}</small>
          </React.Fragment>
        )}
      />
    </div>
  )
}

export class Testimonials extends React.Component {
  render() {
    return (
      <Jumbotron className="testimonials">
        <h1>Testimonials</h1>

        {TESTIMONIALS.map((testimonial, i) => (
          <Testimonial
            key={testimonial.author}
            alternate={i % 2}
            {...testimonial}
          />
        ))}
      </Jumbotron>
    )
  }
}

export default Testimonials
