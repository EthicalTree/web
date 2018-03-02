import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

import { Button, Table } from 'reactstrap'

import { Search } from '../Search'

import { Icon } from '../../../components/Icon'
import { Loader } from '../../../components/Loader'
import { Paginator } from '../../../components/Paginator'

import { getListings, setListingVisibility } from '../../../actions/admin'
import { blurClick } from '../../../utils/a11y'

export class Listings extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({ type: 'SET_ADMIN_SEARCH_QUERY', data: '' })
    dispatch(getListings({ page: 1, query: '' }))
    document.title = "EthicalTree · Listing Admin"
  }

  handleVisibilityChange = id => {
    const { dispatch } = this.props

    return event => {
      dispatch(setListingVisibility(id, event.target.value))
    }
  }

  handleEdit = listing => {
    const { dispatch } = this.props

    dispatch({ type: 'UPDATE_MODAL_DATA', data: {
      id: listing.id,
      planType: listing.plan ? listing.plan.planType : '',
      price: listing.plan ? parseFloat(listing.plan.price) || '' : '',
      visibility: listing.visibility
    }})

    dispatch({ type: 'OPEN_MODAL', data: 'admin-edit-listing' })
  }

  getListings(newData={}) {
    const { dispatch, admin } = this.props

    const currentData = {
      page: 1,
      query: admin.query,
      filter: admin.filter
    }

    dispatch(getListings({...currentData, ...newData}))
  }

  render() {
    const { dispatch, admin } = this.props

    return (
      <Loader loading={admin.isAdminLoading}>
        <h4 className="mt-3 mb-3 d-flex justify-content-between">
          Listings

          <div className="d-flex">
            <Button
              outline={!admin.filter}
              className="mr-4"
              onClick={blurClick(() => {
                dispatch({type: 'SET_ADMIN_FILTER', data: admin.filter ? '' : 'plans'})
                this.getListings({ filter: admin.filter ? '' : 'plans' })
              })}
            >
              Plans
            </Button>

            <Search handleSearch={() => this.getListings()}/>
          </div>
        </h4>

        <Table bordered responsive>
          <thead>
            <tr>
              <th className="no-stretch">ID</th>
              <th>Title</th>
              <th className="no-stretch">Plan Type</th>
              <th className="no-stretch">Custom Price</th>
              <th className="visibility-col">Visibility</th>
              <th className="no-stretch">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admin.listings.map(l => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>
                  <Link to={`/listings/${l.slug}`} target="_blank">
                    {l.title}
                  </Link>
                </td>
                <td>{l.plan ? l.plan.type.name : ''}</td>
                <td>{l.plan && l.plan.price > 0 ? `$${numeral(l.plan.price).format('0.00')}` : ''}</td>
                <td>{l.visibility === 'published' ? 'Visible' : 'Hidden'}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    <Icon
                      className="edit-listing"
                      title="Edit Listing"
                      iconKey="pencil"
                      clickable
                      onClick={() => this.handleEdit(l)}
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
            onPageChange={data => dispatch(getListings({ page: data.selected }))}
          />
        </div>
      </Loader>
    )
  }
}

const select = (state) => {
  return {
    admin: state.admin
  }
}

export default connect(select)(Listings)
