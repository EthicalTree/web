import React from 'react'
import { connect } from 'react-redux'

import { Button, Table } from 'reactstrap'

import { Icon } from '../../../components/Util/Icons'
import { Paginator } from '../../../components/Paginator'
import { Loader } from '../../../components/Loader'

import { setConfirm } from '../../../actions/confirm'
import { getLists, updateList, deleteList } from '../../../actions/admin'

const ListTable = props => {
  const {
    admin,
    handleAddList,
    handleDelete,
    handlePageChange,
    handleMove,
    toggleHidden
  } = props

  const lists = admin.lists.frontPage

  return (
    <Loader loading={admin.isAdminLoading}>
      <h4 className="mt-3 mb-3 d-flex justify-content-between">
        Front Page

        <Button
          color="default"
          onClick={handleAddList}
        >
          + New List
        </Button>
      </h4>


      <Table bordered responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th className="no-stretch">Tag</th>
            <th className="no-stretch">Enabled</th>
            <th className="no-stretch">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lists.data.map(l => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>{l.description}</td>
              <td>{`#${l.tag.hashtag}`}</td>
              <td>
                <input
                  type="checkbox"
                  checked={!l.hidden}
                  onChange={() => toggleHidden(l)}
                />
              </td>
              <td className="d-flex">
                <a
                  href=""
                  title="Delete List"
                  className="delete-list"
                  onClick={handleDelete(l.id)}
                >
                  <Icon iconKey="trash" />
                </a>

                <a
                  href=""
                  title="Move up"
                  className="move-up"
                  onClick={handleMove(l, l.order - 1)}
                >
                  <Icon iconKey="arrow_up" />
                </a>

                <a
                  href=""
                  title="Move down"
                  className="move-down"
                  onClick={handleMove(l, l.order + 1)}
                >
                  <Icon iconKey="arrow_down" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <Paginator
          pageCount={lists.totalPages}
          currentPage={lists.currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </Loader>
  )
}

export class Lists extends React.Component {

  handleDelete = id => {
    const { dispatch } = this.props

    return event => {
      event.preventDefault()
      dispatch(setConfirm({
        title: 'Delete List',
        msg: 'Are you sure you want to delete this list?',
        action: deleteList,
        data: id
      }))
    }
  }

  handleMove = (list, order) => {
    const { dispatch } = this.props

    return event => {
      event.preventDefault()
      dispatch(updateList({
        id: list.id,
        order
      }))
    }
  }

  toggleHidden = list => {
    const { dispatch } = this.props
    dispatch(updateList({
      id: list.id,
      hidden: !list.hidden
    }))
  }

  componentDidMount() {
    this.refreshLists()
  }

  refreshLists() {
    const { dispatch } = this.props
    dispatch(getLists({ page: 1, location: 'front_page' }))
  }

  render() {
    const { dispatch, admin } = this.props

    return (
      <ListTable
        admin={admin}
        toggleHidden={this.toggleHidden}
        handleAddList={() => {
          dispatch({ type: 'OPEN_MODAL', data: 'add_list' })
        }}
        handleDelete={this.handleDelete}
        handleMove={this.handleMove}
        handlePageChange={data => dispatch(getLists({
          page: data.selected,
          location: 'front_page'
        }))}
      />
    )
  }
}

const select = (state) => {
  return {
    admin: state.admin
  }
}

export default connect(select)(Lists)
