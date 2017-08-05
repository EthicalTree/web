import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../Global'

import {
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap'

import { Ethicality } from '../Ethicality/Ethicality'

import { getEthicalities, editEthicalities } from '../../actions/listing'

class EditEthicalitiesModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedEthicalities: []
    }
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(getEthicalities())
  }

  componentWillReceiveProps(props) {
    const { listing } = props
    if (listing.ethicalities) {
      this.setState({ selectedEthicalities: listing.ethicalities})
    }
  }

  submit(e) {
    e.preventDefault()

    const { dispatch, listing } = this.props

    dispatch(editEthicalities(listing.slug, this.state.selectedEthicalities))
  }

  selectEthicality(key) {
    const { ethicalities } = this.props.app || []
    let { selectedEthicalities } = this.state

    const ethicality = ethicalities.find(e => e.slug === key)
    const exists = selectedEthicalities.find(e => e.slug === key)

    if (ethicality) {
      const newEthicalities = selectedEthicalities.filter(e => e.slug !== key)

      if (!exists) {
        this.setState({ selectedEthicalities: [...newEthicalities, ethicality] })
      }
      else {
        this.setState({ selectedEthicalities: newEthicalities })
      }
    }
  }

  render() {
    const { listing, app, dispatch } = this.props
    const ethicalities = app.ethicalities || []

    return (
      <Modal
        className="edit-ethicalities-modal medium-modal"
        loading={listing.isEditingListingEthicalitiesLoading}
        contentLabel="Edit Listing Ethicalities"
        onSave={this.submit.bind(this)}
        onRequestClose={e => { dispatch({ type: 'SET_EDITING_LISTING_ETHICALITIES', data: false }) }}
        isOpen={listing.isEditingListingEthicalities}>

        <Container>
          {listing.editEthicalitiesErrors &&
            <Row>
              <Col>
                <Alert color="danger">
                  {listing.editEthicalitiesErrors}
                </Alert>
              </Col>
            </Row>
          }

          <Row className="text-center mb-2">
            <Col>
              <p>Select all that apply</p>
            </Col>
          </Row>

          <Row className="pl-4 pr-4">
            {ethicalities.map(ethicality => {
              return (
                <Col key={ethicality.slug} xs="6" className="p-2">
                  <Ethicality
                    className="p-3 bordered"
                    name={ethicality.name}
                    slug={ethicality.slug}
                    icon_key={ethicality.icon_key}
                    selected={!!this.state.selectedEthicalities.find(e => e.slug === ethicality.slug)}
                    onSelect={this.selectEthicality.bind(this)}
                  />
                </Col>
              )
            })}
          </Row>

        </Container>
      </Modal>
    )
  }

}

const select = (state) => {
  return {
    listing: state.listing,
    app: state.app
  }
}

export default connect(select)(EditEthicalitiesModal)
