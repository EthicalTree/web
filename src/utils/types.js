import PropTypes from 'prop-types'

export const tagProp = PropTypes.shape({
  id: PropTypes.number.isRequired,
  hashtag: PropTypes.string.isRequired
})
