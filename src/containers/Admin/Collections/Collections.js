import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { Button, Input, Table } from 'reactstrap'

import { Search } from '../Search'

import { Icon } from '../../../components/Icon'
import { Paginator } from '../../../components/Paginator'
import { Loader } from '../../../components/Loader'

import { setConfirm } from '../../../actions/confirm'
import {
  getCollections,
  updateCollection,
  deleteCollection,
} from '../../../actions/admin'

const CollectionTable = props => {
  const {
    dispatch,
    admin,
    handleAdd,
    handleEdit,
    handleDelete,
    handlePageChange,
    handleMove,
    toggleHidden,
    toggleFeatured,
    changeLocation,
  } = props

  const collections = admin.collections

  return (
    <Loader loading={admin.isAdminLoading}>
      <h4 className="mt-3 mb-3 d-flex justify-content-between">
        Collections
        <div className="d-flex">
          <Button className="mr-4" color="default" onClick={handleAdd}>
            + New Collection
          </Button>
          <Search
            handleSearch={() =>
              dispatch(getCollections({ page: 1, query: admin.query }))
            }
          />
        </div>
      </h4>

      <Table bordered responsive>
        <thead>
          <tr>
            <th className="no-stretch" />
            <th>Name</th>
            <th>Description</th>
            <th className="no-stretch">Tag</th>
            <th className="no-stretch">Location</th>
            <th className="no-stretch">Enabled</th>
            <th className="no-stretch">Featured</th>
            <th className="no-stretch">Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections.map(l => (
            <tr key={l.id}>
              <td>
                {l.coverImage && (
                  <img
                    className="collection-thumbnail"
                    src={l.coverImage.thumbnailUrl}
                    alt=""
                  />
                )}
              </td>
              <td>{l.name}</td>
              <td>{l.description}</td>
              <td>{`#${l.hashtag}`}</td>
              <td>
                <Input
                  value={l.location || ''}
                  onChange={e => changeLocation(l, e.target.value)}
                  type="select">
                  <option value="">None</option>
                  <option value="front_page">Front Page</option>
                </Input>
              </td>
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
                    title="Delete Collection"
                    className="delete-collection"
                    clickable
                    onClick={handleDelete(l.id)}
                  />

                  <Icon
                    iconKey="pencil"
                    title="Edit Collection"
                    className="edit-collection"
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

export class Collections extends React.Component {
  changeLocation = (collection, location) => {
    const { dispatch } = this.props

    dispatch(
      updateCollection({
        id: collection.id,
        location,
      })
    )
  }

  handleAdd = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'UPDATE_MODAL_DATA',
      data: {
        collection: {
          name: '',
          description: '',
          hashtag: '',
          coverImage: '',
        },
      },
    })
    dispatch({ type: 'OPEN_MODAL', data: 'new-collection' })
  }

  handleDelete = id => {
    const { dispatch } = this.props

    return event => {
      event.preventDefault()
      dispatch(
        setConfirm({
          title: 'Delete Collection',
          msg: 'Are you sure you want to delete this collection?',
          action: deleteCollection,
          data: id,
        })
      )
    }
  }

  handleEdit = collection => {
    const { dispatch } = this.props

    return event => {
      event.preventDefault()
      dispatch({ type: 'UPDATE_MODAL_DATA', data: { collection } })
      dispatch({ type: 'OPEN_MODAL', data: 'new-collection' })
    }
  }

  handleMove = (collection, order) => {
    const { dispatch } = this.props

    return event => {
      event.preventDefault()
      dispatch(
        updateCollection({
          id: collection.id,
          order,
        })
      )
    }
  }

  toggleHidden = collection => {
    const { dispatch } = this.props
    dispatch(
      updateCollection({
        id: collection.id,
        hidden: !collection.hidden,
      })
    )
  }

  toggleFeatured = collection => {
    const { dispatch } = this.props
    dispatch(
      updateCollection({
        id: collection.id,
        featured: !collection.featured,
      })
    )
  }

  componentDidMount() {
    this.refreshCollections()
  }

  refreshCollections() {
    const { dispatch } = this.props
    dispatch({ type: 'SET_ADMIN_SEARCH_QUERY', data: '' })
    dispatch(getCollections({ page: 1, query: '' }))
  }

  render() {
    const { dispatch, admin } = this.props

    return (
      <React.Fragment>
        <Helmet>
          <title>{'EthicalTree Admin · Collections'}</title>
        </Helmet>

        <CollectionTable
          admin={admin}
          changeLocation={this.changeLocation}
          dispatch={dispatch}
          toggleHidden={this.toggleHidden}
          toggleFeatured={this.toggleFeatured}
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          handleMove={this.handleMove}
          handlePageChange={data =>
            dispatch(getCollections({ page: data.selected }))
          }
        />
      </React.Fragment>
    )
  }
}

const select = state => {
  return {
    admin: state.admin,
  }
}

export default connect(select)(Collections)
