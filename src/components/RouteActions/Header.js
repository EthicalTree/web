import { connect } from 'react-redux'

const FixedPaths = [
  '/s/'
]

const setHeader = (props) => {
  const { dispatch, location } = props

  const hasFixedHeader = FixedPaths.filter(
    fp => location.pathname.startsWith(fp)
  ).length

  if (hasFixedHeader) {
    dispatch({ type: 'SET_FIXED_HEADER', data: true })
  }
  else {
    dispatch({ type: 'SET_FIXED_HEADER', data: false })
  }

  return null
}

const select = (state) => {
  return {
  }
}

export default connect(select)(setHeader)

