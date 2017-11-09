import React from 'react'

import { UncontrolledTooltip as Tooltip } from 'reactstrap'

import {
  makeImageCover,
  deleteImageFromListing
} from '../../actions/listing'

import Loader from '../Global/Loader'
import ETSlider from '../Global/Slider'
import S3Uploader from '../Global/S3'

import { setConfirm } from '../../actions/confirm'

const ImageActions = (props) => {
  const { dispatch, slug, currentImage } = props

  return (
    <div>
      <div className="actions">
        <div><div className="triangle"></div></div>
        <i
          id="makeCoverPhoto"
          title="Make cover photo"
          role="button"
          tabIndex="0"
          onClick={() => dispatch(setConfirm({
            title: 'Set Cover Photo',
            msg: 'Are you sure you want to make this photo your cover photo?',
            action: makeImageCover,
            data: {
              listingSlug: slug,
              image_id: currentImage.id
            }
          }))}
          className="icon-button fa fa-file-picture-o" />
        <Tooltip placement="bottom" target="makeCoverPhoto" delay={0}>Make cover photo</Tooltip>

        <i
          id="deleteImage"
          title="Delete photo"
          role="button"
          tabIndex="0"
          onClick={() => dispatch(setConfirm({
            title: 'Delete Photo',
            msg: 'Are you sure you want to delete this photo?',
            action: deleteImageFromListing,
            data: {
              listingSlug: props.listing.slug,
              image_id: currentImage.id
            }
          }))}
          className="icon-button fa fa-trash image-delete" />
        <Tooltip placement="bottom" target="deleteImage" delay={0}>Delete photo</Tooltip>

        <S3Uploader
          onProgress={props.onImageUploadProgress}
          onFinish={props.onImageUploadFinish}
          signingUrlQueryParams={{ slug: slug }}>

          <i
            id="addImage"
            title="Add new photo"
            tabIndex="0"
            role="button"
            className="icon-button fa fa-plus-circle" />
          <Tooltip placement="bottom" target="addImage" delay={0}>Add new photo</Tooltip>

        </S3Uploader>
      </div>
    </div>
  )
}

class ListingImages extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({ type: 'SET_LISTING_CURRENT_IMAGE' })
  }

  handleSlideChange(index) {
    const { dispatch, images } = this.props
    const image = images[index]

    dispatch({ type: 'SET_LISTING_CURRENT_IMAGE', data: image })
  }

  render() {
    const { images, dispatch, canEdit, slug, isLoading, uploadProgress, currentImage } = this.props
    const hasSlides = images && images.length > 0

    return (
      <Loader
        loading={isLoading}
        progress={uploadProgress}
      >
        {hasSlides &&
          <div className="listing-images text-center">
            {hasSlides &&
              <ETSlider
                afterChange={this.handleSlideChange.bind(this)}
                slides={
                  images.map(image => {
                    const url = `${process.env.REACT_APP_S3_URL}/${image.key}`

                    let style = {
                      background: `url('${url}') no-repeat center center`,
                      height: '300px'
                    }

                    return (
                      <div
                        className="listing-image"
                        key={image.key}>
                        <div style={style} />
                      </div>
                    )
                  })
                }
              />
            }

            {canEdit &&
              <ImageActions
                dispatch={dispatch}
                onImageUploadProgress={this.props.onImageUploadProgress}
                onImageUploadFinish={this.props.onImageUploadFinish}
                hasSlides={hasSlides}
                slug={slug}
                currentImage={currentImage}
              />
            }
          </div>
        }

        {!hasSlides && canEdit &&
          <S3Uploader
            onProgress={this.props.onImageUploadProgress}
            onFinish={this.props.onImageUploadFinish}
            signingUrlQueryParams={{ slug }}>

            <div className="listing-images text-center no-content uploadable">
              <div className="upload-wrapper">
                <i className="fa fa-camera-retro camera"></i>
                <span className="add-picture-cta">
                  Add a photo
                </span>
              </div>
            </div>
          </S3Uploader>
        }

        {!hasSlides && !canEdit &&
          <div className="listing-images text-center no-content">
            <i className="fa fa-camera-retro camera"></i>
            No photos added
          </div>
        }
      </Loader>
    )
  }
}

export default ListingImages
