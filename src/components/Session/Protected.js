import React from 'react'
import { connect } from 'react-redux'
import { getPermissions } from '../../actions/session'

class Protected extends React.Component {

  hasPermission() {
    const { dispatch, permissions, permission } = this.props
    const object = this.props.object || {}
    const { class_name, id } = object

    if (!class_name) {
      return false
    }

    const key = `${class_name}__${id}`
    const permObj = permissions[key]

    if (!permObj) {
      dispatch(getPermissions(class_name, id, key))
    }

    return permObj[permission]
  }

  render() {
    const { children } = this.props

    if (this.hasPermission()) {
      return children
    }

    return null
  }

}

const select = (state) => {
  return {
    permissions: state.permissions
  }
}

export default connect(select)(Protected)

