import PropTypes from 'prop-types'

export const listingProps = {

}

export const tagProp = {
  id: PropTypes.number.isRequired,
  hashtag: PropTypes.string.isRequired,
  listings: PropTypes.arrayOf(PropTypes.shape(listingProps))
}

export const curatedListProps = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  tag: PropTypes.shape(tagProp)
}


