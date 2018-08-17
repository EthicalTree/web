import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import { Helmet } from 'react-helmet'
import { Button, ButtonGroup, Table } from 'reactstrap'

import { Search } from '../Search'

import { Icon } from '../../../components/Icon'
import { Loader } from '../../../components/Loader'
import { Paginator } from '../../../components/Paginator'
import { ClaimStatus } from '../../../components/Listing/ClaimStatus'
import { ListingDetail } from '../../../components/Admin/Listing/ListingDetail'

import { getListings, setListingVisibility } from '../../../actions/admin'
import { blurClick } from '../../../utils/a11y'

export class Listings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expandedListings: [],
    }
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({ type: 'SET_ADMIN_SEARCH_QUERY', data: '' })
    dispatch(getListings({ page: 1, query: '' }))
  }

  handleVisibilityChange = id => {
    const { dispatch } = this.props

    return event => {
      dispatch(setListingVisibility(id, event.target.value))
    }
  }

  handleEdit = listing => {
    const { dispatch } = this.props

    dispatch({
      type: 'UPDATE_MODAL_DATA',
      data: {
        id: listing.id,
        planType: listing.plan ? listing.plan.planType : '',
        price: listing.plan ? parseFloat(listing.plan.price) || '' : '',
        visibility: listing.visibility,
      },
    })

    dispatch({ type: 'OPEN_MODAL', data: 'admin-edit-listing' })
  }

  filter = filterType => {
    const { dispatch, admin } = this.props
    const { filters } = admin

    const newFilters = filters.includes(filterType)
      ? filters.filter(f => f !== filterType)
      : [...filters, filterType]

    dispatch({ type: 'SET_ADMIN_FILTER', data: newFilters })
    this.getListings({ filters: newFilters })
  }

  getListings(newData = {}) {
    const { dispatch, admin } = this.props

    const currentData = {
      page: 1,
      query: admin.query,
      filters: admin.filters,
    }

    dispatch(getListings({ ...currentData, ...newData }))
  }

  render() {
    const { dispatch, admin } = this.props
    const { expandedListings } = this.state

    return (
      <Loader loading={false}>
        <Helmet>
          <title>{'EthicalTree Admin · Listings'}</title>
        </Helmet>

        <h4 className="mt-3 mb-3 d-flex justify-content-between">
          Listings
          <div className="d-flex">
            <ButtonGroup className="mr-4">
              <Button
                outline={!admin.filters.includes('pending_claims')}
                onClick={blurClick(() => this.filter('pending_claims'))}>
                Pending Claims
              </Button>

              <Button
                outline={!admin.filters.includes('plans')}
                onClick={blurClick(() => this.filter('plans'))}>
                Plans
              </Button>
            </ButtonGroup>

            <Search handleSearch={() => this.getListings()} />
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
            {admin.listings.map(l => {
              const expanded = expandedListings.includes(l.id)

              const row = (
                <tr key={l.id}>
                  <td>{l.id}</td>
                  <td>
                    <div className="d-flex">
                      <Link
                        to={`/listings/${l.city || '_'}/${l.slug}`}
                        target="_blank">
                        {l.title}
                      </Link>
                      <ClaimStatus status={l.claimStatus} />
                    </div>
                  </td>
                  <td>{l.plan ? l.plan.type.name : ''}</td>
                  <td>
                    {l.plan && l.plan.price > 0
                      ? `$${numeral(l.plan.price).format('0.00')}`
                      : ''}
                  </td>
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

                      <Icon
                        className="expand-listing"
                        title={expanded ? 'Collapse' : 'Expand'}
                        iconKey={expanded ? 'chevron_up' : 'chevron_down'}
                        clickable
                        onClick={() => {
                          const newExpandedListings = expanded
                            ? expandedListings.filter(el => el !== l.id)
                            : [...expandedListings, l.id]

                          this.setState({
                            expandedListings: newExpandedListings,
                          })
                        }}
                      />
                    </div>
                  </td>
                </tr>
              )

              if (!expanded) {
                return row
              } else {
                return [
                  row,
                  <tr key={`${l.id}-details`}>
                    <ListingDetail
                      listing={l}
                      regenerateClaimId={this.regenerateClaimId}
                      setEditingClaimForListing={this.setEditingClaimForListing}
                    />
                  </tr>,
                ]
              }
            })}
          </tbody>
        </Table>
        <div className="text-center">
          <Paginator
            pageCount={admin.totalPages}
            currentPage={admin.currentPage}
            onPageChange={data =>
              dispatch(getListings({ page: data.selected }))
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

export default connect(select)(Listings)
