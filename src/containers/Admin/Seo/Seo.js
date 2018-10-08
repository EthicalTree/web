import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { Button, Table } from 'reactstrap'

import { Search } from '../Search'

import { Icon } from '../../../components/Icon'
import { Paginator } from '../../../components/Paginator'
import { Loader } from '../../../components/Loader'

import { setConfirm } from '../../../actions/confirm'
import { deleteSeoPath, getSeoPaths } from '../../../actions/admin'

export class Seo extends React.Component {
  handleAdd = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'UPDATE_MODAL_DATA',
      data: {
        path: '',
        title: '',
        description: '',
        header: '',
      },
    })
    dispatch({ type: 'OPEN_MODAL', data: 'admin-edit-seo-path' })
  }

  handleEdit = seoPath => {
    const { dispatch } = this.props

    return event => {
      event.preventDefault()
      dispatch({ type: 'UPDATE_MODAL_DATA', data: seoPath })
      dispatch({ type: 'OPEN_MODAL', data: 'admin-edit-seo-path' })
    }
  }

  handleDelete = seoPath => {
    const { dispatch } = this.props

    return event => {
      event.preventDefault()
      dispatch(
        setConfirm({
          title: 'Delete Seo Path',
          msg: 'Are you sure you want to delete this Seo Path?',
          action: deleteSeoPath,
          data: seoPath.id,
        })
      )
    }
  }



  componentDidMount() {
    const { dispatch } = this.props

    dispatch({ type: 'SET_ADMIN_SEARCH_QUERY', data: '' })
    dispatch(getSeoPaths({ page: 1, query: '' }))
  }

  render() {
    const { dispatch, admin } = this.props
    const seoPaths = admin.seoPaths

    return (
      <Loader loading={admin.isAdminLoading}>
        <Helmet>
          <title>{'EthicalTree Admin · Seo Paths'}</title>
        </Helmet>

        <h4 className="mt-3 mb-3 d-flex justify-content-between">
          Seo Paths
          <div className="d-flex">
            <Button className="mr-4" color="default" onClick={this.handleAdd}>
              + New SEO Path
            </Button>
            <Search
              handleSearch={() =>
                dispatch(getSeoPaths({ page: 1, query: admin.query }))
              }
            />
          </div>
        </h4>

        <Table bordered responsive>
          <thead>
            <tr>
              <th className="no-stretch">Path</th>
              <th>Title</th>
              <th>Description</th>
              <th>Header</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {seoPaths.map(seoPath => {
              return (
                <tr key={seoPath.path}>
                  <td>{seoPath.path}</td>
                  <td>{seoPath.title}</td>
                  <td>{seoPath.description}</td>
                  <td>{seoPath.header}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <Icon
                        iconKey="pencil"
                        title="Edit Seo Path"
                        className="edit-seo-path"
                        clickable
                        onClick={this.handleEdit(seoPath)}
                      />

                      <Icon
                        iconKey="trash"
                        title="Delete Seo Path"
                        className="edit-seo-path"
                        clickable
                        onClick={this.handleDelete(seoPath)}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <div className="text-center">
          <Paginator
            pageCount={admin.totalPages}
            currentPage={admin.currentPage}
            onPageChange={data =>
              dispatch(getSeoPaths({ page: data.selected }))
            }
          />
        </div>
      </Loader>
    )
  }
}

const select = state => {
  return {
    admin: state.admin,
  }
}

export default connect(select)(Seo)
