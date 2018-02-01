import React from 'react'
import { connect } from 'react-redux'
import Loader from '../Global/Loader'

import {
  Table,
  Input
} from 'reactstrap'

import { getTags } from '../../actions/admin'

class Tags extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(getTags())
  }

  render() {
    const { admin } = this.props
    const tags = admin.tags.sort((t1, t2) => t1.hashtag - t2.hashtag)

    return (
      <Loader loading={admin.isTagAdminLoading}>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Tag</th>
              <th className="use-type-col">Use Type</th>
            </tr>
          </thead>
          <tbody>
            {tags.map(t => (
              <tr key={t.id}>
                <td>{`#${t.hashtag}`}</td>
                <td>
                  <Input type="select" name="use_type">
                    <option>category</option>
                    <option>admin</option>
                  </Input>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loader>
    )
  }
}

const select = (state) => {
  return {
    admin: state.admin
  }
}

export default connect(select)(Tags)
