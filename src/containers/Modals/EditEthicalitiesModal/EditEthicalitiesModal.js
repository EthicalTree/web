import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../Modal'

import {
  Row,
  Col,
} from 'reactstrap'

import { Ethicality } from '../../../components/Ethicality'

import { editEthicalities } from '../../../actions/listing'

class EditEthicalitiesModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedEthicalities: []
    }
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
    const { app, modal } = this.props
    const ethicalities = app.ethicalities || []

    return (
      <Modal
        className="edit-ethicalities-modal medium-modal"
        loading={modal.isLoading}
        contentLabel="Edit Listing Ethicalities"
        onSave={this.submit.bind(this)}
        modalName="edit-ethicalities"
      >
        <Row className="text-center mb-2">
          <Col>
            <p>Select all that apply</p>
          </Col>
        </Row>

        <div className="pl-4 pr-4 d-flex flex-wrap justify-content-center">
          {ethicalities.map(ethicality => {
            return (
              <Col key={ethicality.slug} xs="6" className="p-2">
                <Ethicality
                  className="p-3 bordered"
                  name={ethicality.name}
                  slug={ethicality.slug}
                  iconKey={ethicality.iconKey}
                  selected={!!this.state.selectedEthicalities.find(e => e.slug === ethicality.slug)}
                  onSelect={this.selectEthicality.bind(this)}
                />
              </Col>
            )
          })}
        </div>
      </Modal>
    )
  }

}

const select = (state) => {
  return {
    listing: state.listing,
    app: state.app,
    modal: state.modal
  }
}

export default connect(select)(EditEthicalitiesModal)
