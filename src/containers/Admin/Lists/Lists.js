import React from 'react'
import { connect } from 'react-redux'

import { Button, Table } from 'reactstrap'

import { Search } from '../Search'

import { Icon } from '../../../components/Icon'
import { Paginator } from '../../../components/Paginator'
import { Loader } from '../../../components/Loader'

import { setConfirm } from '../../../actions/confirm'
import { getLists, updateList, deleteList } from '../../../actions/admin'

const ListTable = props => {
  const {
    dispatch,
    admin,
    handleAdd,
    handleEdit,
    handleDelete,
    handlePageChange,
    handleMove,
    toggleHidden,
    toggleFeatured
  } = props

  const lists = admin.lists

  return (
    <Loader loading={admin.isAdminLoading}>
      <h4 className="mt-3 mb-3 d-flex justify-content-between">
        Tag lists

        <div className="d-flex">
          <Button
            className="mr-4"
            color="default"
            onClick={handleAdd}
          >
            + New List
          </Button>
          <Search
            handleSearch={() => dispatch(getLists({ page: 1, query: admin.query }))}
          />
        </div>
      </h4>


      <Table bordered responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th className="no-stretch">Tag</th>
            <th className="no-stretch">Enabled</th>
            <th className="no-stretch">Featured</th>
            <th className="no-stretch">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lists.map(l => (
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
              <td>
                <input
                  type="radio"
                  checked={l.featured}
                  onClick={() => toggleFeatured(l)}
                  onChange={() => {}}
                />
              </td>
              <td>
                <div className="d-flex">

                  <Icon
                    iconKey="trash"
                    title="Delete List"
                    className="delete-list"
                    clickable
                    onClick={handleDelete(l.id)}
                  />

                  <Icon
                    iconKey="pencil"
                    title="Edit List"
                    className="edit-list"
                    clickable
                    onClick={handleEdit(l)}
                  />

                  <Icon
                    iconKey="arrow_up"
                    title="Move up"
                    className="move-up"
                    clickable
                    onClick={handleMove(l, l.order - 1)}
                  />

                  <Icon
                    iconKey="arrow_down"
                    title="Move down"
                    className="move-down"
                    clickable
                    onClick={handleMove(l, l.order + 1)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <Paginator
          pageCount={admin.totalPages}
          currentPage={admin.currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </Loader>
  )
}

export class Lists extends React.Component {

  handleAdd = () => {
    const { dispatch } = this.props

    dispatch({ type: 'OPEN_MODAL', data: 'new-list' })
  }

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

  handleEdit = list => {
    const { dispatch } = this.props

    return event => {
      event.preventDefault()
      dispatch({ type: 'UPDATE_MODAL_DATA', data: {...list, hashtag: list.tag.hashtag} })
      dispatch({ type: 'OPEN_MODAL', data: 'new-list' })
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

  toggleFeatured = list => {
    const { dispatch } = this.props
    dispatch(updateList({
      id: list.id,
      featured: !list.featured
    }))
  }

  componentDidMount() {
    document.title = "EthicalTree · Lists Admin"
    this.refreshLists()
  }

  refreshLists() {
    const { dispatch } = this.props
    dispatch({ type: 'SET_ADMIN_SEARCH_QUERY', data: '' })
    dispatch(getLists({ page: 1, query: '' }))
  }

  render() {
    const { dispatch, admin } = this.props

    return (
      <ListTable
        dispatch={dispatch}
        admin={admin}
        toggleHidden={this.toggleHidden}
        toggleFeatured={this.toggleFeatured}
        handleAdd={this.handleAdd}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        handleMove={this.handleMove}
        handlePageChange={data => dispatch(getLists({ page: data.selected }))}
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
