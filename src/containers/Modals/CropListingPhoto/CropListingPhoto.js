import './CropListingPhoto.css'

import React from 'react'
import { connect } from 'react-redux'

import { Modal } from '../Modal'
import { Cropper } from '../../../components/Cropper'

import {
  Row,
  Col,
} from 'reactstrap'

import { cropPhoto } from '../../../actions/listing'
import { s3Url } from '../../../utils/s3'
import { percentage } from '../../../utils/number'

class CropListingPhoto extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  handleCrop = cropData => {
    const { dispatch } = this.props

    console.log(cropData)

    dispatch({ type: 'SET_LISTING_CROP_DATA', data: cropData })
  }

  submit(e) {
    e.preventDefault()

    const { dispatch, listing } = this.props

    dispatch(cropPhoto(listing.slug, this.state))
  }

  render() {
    const { listing, modal } = this.props
    const image = modal.modalData

    return (
      <Modal
        className="crop-listing-photo-modal large-modal"
        loading={modal.isLoading}
        contentLabel="Crop Photo"
        onSave={this.submit.bind(this)}
        modalName="crop-listing-photo"
      >
        <Row>
          <Col>
            <Cropper
              aspectRatio={11 / 3}
              handleCrop={this.handleCrop}
              src={s3Url('ethicaltree', image.key)}
              style={{
                width: '100%',
                height: percentage(window.innerHeight, 40)
              }}
            />
          </Col>
        </Row>
      </Modal>
    )
  }

}

const select = (state) => {
  return {
    listing: state.listing,
    modal: state.modal
  }
}

export default connect(select)(CropListingPhoto)
