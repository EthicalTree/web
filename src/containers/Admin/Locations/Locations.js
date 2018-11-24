import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { Table, ButtonGroup, Button, Input } from 'reactstrap'

import { Search } from '../Search'

import { Icon } from '../../../components/Icon'
import { Paginator } from '../../../components/Paginator'
import { Loader } from '../../../components/Loader'

import { setConfirm } from '../../../actions/confirm'
import { getLocations, deleteLocation } from '../../../actions/admin'

import { blurClick } from '../../../utils/a11y'

const LOCATION_TYPES = {
  city: 'city',
  neighbourhood: 'neighbourhood',
}

export class Locations extends React.Component {
  handleEdit = location => {
    const { dispatch } = this.props

    return event => {
      event.preventDefault()
      dispatch({ type: 'UPDATE_MODAL_DATA', data: { ...location } })
      dispatch({ type: 'OPEN_MODAL', data: 'admin-edit-location' })
    }
  }

  handleNew = () => {
    const { dispatch } = this.props

    return event => {
      event.preventDefault()
      dispatch({ type: 'UPDATE_MODAL_DATA', data: {} })
      dispatch({ type: 'OPEN_MODAL', data: 'admin-new-location' })
    }
  }

  handleDelete = location => {
    const { dispatch } = this.props

    return event => {
      event.preventDefault()
      dispatch(
        setConfirm({
          title: 'Delete Location',
          msg: `Are you sure you want to delete this location (${
            location.name
          })?`,
          action: deleteLocation,
          data: location,
        })
      )
    }
  }

  filterLocationType = locationType => {
    const { dispatch } = this.props
    dispatch({ type: 'SET_ADMIN_PARAMS', data: { locationType } })
    this.getLocations({ params: { locationType } })
  }

  getLocations = (newData = {}) => {
    const { dispatch, admin } = this.props

    const currentData = {
      page: 1,
      query: admin.query,
      params: admin.params,
    }

    dispatch(getLocations({ ...currentData, ...newData }))
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({ type: 'SET_ADMIN_SEARCH_QUERY', data: '' })
    dispatch({
      type: 'SET_ADMIN_PARAMS',
      data: { locationType: LOCATION_TYPES.neighbourhood },
    })
    dispatch(
      getLocations({
        page: 1,
        query: '',
        params: {
          locationType: LOCATION_TYPES.neighbourhood,
        },
      })
    )
  }

  render() {
    const { admin } = this.props
    const { params } = admin
    const locations = admin.locations

    return (
      <Loader loading={admin.isAdminLoading}>
        <Helmet>
          <title>{'EthicalTree Admin · Locations'}</title>
        </Helmet>

        <h4 className="mt-3 mb-3 d-flex justify-content-between">
          Locations
          <div className="d-flex">
            <ButtonGroup className="mr-4">
              <Button
                outline={params.locationType !== LOCATION_TYPES.neighbourhood}
                onClick={blurClick(() =>
                  this.filterLocationType(LOCATION_TYPES.neighbourhood)
                )}
              >
                Neighbourhoods
              </Button>
              <Button
                outline={params.locationType !== LOCATION_TYPES.city}
                onClick={blurClick(() =>
                  this.filterLocationType(LOCATION_TYPES.city)
                )}
              >
                Cities
              </Button>
            </ButtonGroup>
            <Button className="mr-4" color="default" onClick={this.handleNew()}>
              + New Location
            </Button>
            <Search
              handleSearch={() => this.getLocations({ query: admin.query })}
            />
          </div>
        </h4>

        <Table bordered responsive>
          <thead>
            <tr>
              <th className="no-stretch">ID</th>
              <th className="">Name</th>
              <th className="no-stretch">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(l => {
              return (
                <tr key={`${l.id}-${l.name}`}>
                  <td>{l.id}</td>
                  <td>{l.name}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <Icon
                        iconKey="pencil"
                        title="Edit Location"
                        className="edit-location"
                        clickable
                        onClick={this.handleEdit(l)}
                      />
                      <Icon
                        iconKey="trash"
                        title="Delete Location"
                        className="delete-location"
                        clickable
                        onClick={this.handleDelete(l)}
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
            onPageChange={data => this.getLocations({ page: data.selected })}
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

export default connect(select)(Locations)
