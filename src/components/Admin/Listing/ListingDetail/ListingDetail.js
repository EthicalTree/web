import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'

import { UserDropdown } from '../../../User/UserDropdown'
import { updateListing } from '../../../../actions/admin'

export class ListingDetail extends React.Component {
  changeListingClaim = user => {
    const { dispatch, listing } = this.props

    dispatch(
      updateListing({
        id: listing.id,
        owner_id: user ? user.id : '-1',
      })
    )

    this.setState({ isEditingClaim: false })
  }

  regenerateClaimId = listing => {
    const { dispatch } = this.props

    dispatch(
      updateListing({
        id: listing.id,
        regenerateClaimId: true,
      })
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      isEditingClaim: false,
    }
  }

  renderClaim() {
    const { listing } = this.props
    const { owner, claimStatus } = listing
    const { isEditingClaim } = this.state

    if (isEditingClaim) {
      return <UserDropdown onUserSelected={this.changeListingClaim} />
    }

    if (owner) {
      if (claimStatus === 'pending_verification') {
        return (
          <span>
            {owner.displayNameWithEmail}
            <a
              className="ml-3"
              href=""
              onClick={e => {
                e.preventDefault()
                this.changeListingClaim({ id: owner.id })
              }}
            >
              Confirm claim
            </a>
          </span>
        )
      } else {
        return owner.displayNameWithEmail
      }
    }

    return <i>Unclaimed</i>
  }

  render() {
    const { listing } = this.props
    const { isEditingClaim } = this.state

    return (
      <td className="table-detail" colSpan={9999}>
        <table>
          <tbody>
            <tr>
              <th>Slug</th>
              <td>{listing.slug}</td>
            </tr>
            <tr>
              <th>Claimed By</th>
              <td>
                <div className="d-flex justify-content-between">
                  {this.renderClaim()}

                  {isEditingClaim && (
                    <Button
                      onClick={() => this.setState({ isEditingClaim: false })}
                      color="default"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  )}

                  {!isEditingClaim && (
                    <div className="d-flex">
                      {listing.claimStatus !== 'unclaimed' && (
                        <Button
                          className="mr-2"
                          color="default"
                          onClick={() => this.changeListingClaim()}
                        >
                          Remove Claim
                        </Button>
                      )}

                      <Button
                        onClick={() => this.setState({ isEditingClaim: true })}
                        size="sm"
                      >
                        Change Claim
                      </Button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th>Claim Id</th>
              <td>
                <div className="d-flex justify-content-between">
                  {listing.claimId}
                  <Button
                    onClick={() => this.regenerateClaimId(listing)}
                    size="sm"
                  >
                    Regenerate
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <th>Claim Url</th>
              <td>{listing.claimUrl}</td>
            </tr>
          </tbody>
        </table>
      </td>
    )
  }
}

const select = () => ({})

export default connect(select)(ListingDetail)
