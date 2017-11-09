import './ImageManager.sass'

import React from 'react'
import PropTypes from 'prop-types'

import { UncontrolledTooltip as Tooltip } from 'reactstrap'
import Loader from '../Global/Loader'
import S3Uploader from '../Global/S3'
import ETSlider from './Slider'

import { setConfirm } from '../../actions/confirm'

const ImageActions = (props) => {
  const {
    dispatch,
    slug,
    currentImage,
    coverAction,
    deleteAction,
    addAction
  } = props

  return (
    <div>
      <div className="actions">
        <div><div className="triangle"></div></div>

        {!!coverAction.handleAction &&
          <i
            id="makeCoverPhoto"
            title={coverAction.title}
            role="button"
            tabIndex="0"
            onClick={() => dispatch(setConfirm({
              title: coverAction.title,
              msg: coverAction.confirmMsg,
              action: coverAction.handleAction,
              data: {
                listingSlug: slug,
                image_id: currentImage.id
              }
            }))}
            className="icon-button fa fa-file-picture-o"
          >
            <Tooltip placement="bottom" target="makeCoverPhoto" delay={0}>Make cover photo</Tooltip>
          </i>
        }

        {!!deleteAction.handleAction &&
          <i
            id="deleteImage"
            title={deleteAction.title}
            role="button"
            tabIndex="0"
            onClick={() => dispatch(setConfirm({
              title: deleteAction.title,
              msg: deleteAction.confirmMsg,
              action: deleteAction.handleAction,
              data: {
                listingSlug: slug,
                image_id: currentImage.id
              }
            }))}
            className="icon-button fa fa-trash image-delete"
          >
            <Tooltip placement="bottom" target="deleteImage" delay={0}>{deleteAction.title}</Tooltip>
          </i>
        }

        {!!addAction.handleAction &&
          <S3Uploader
            onProgress={props.onImageUploadProgress}
            onFinish={image => dispatch(addAction.handleAction(slug, image.key))}
            signingUrlQueryParams={{ slug }}>

            <i
              id="addImage"
              title={addAction.title}
              tabIndex="0"
              role="button"
              className="icon-button fa fa-plus-circle" />
            <Tooltip placement="bottom" target="addImage" delay={0}>{addAction.title}</Tooltip>

          </S3Uploader>
        }

      </div>
    </div>
  )
}

ImageActions.propTypes = {
  coverAction: PropTypes.object,
  deleteAction: PropTypes.object,
  addAction: PropTypes.object
}

ImageActions.defaultProps = {
  coverAction: {},
  deleteAction: {},
  addAction: {}
}

class ImageManager extends React.Component {

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
    const {
      images,
      dispatch,
      canEdit,
      slug,
      isLoading,
      uploadProgress,
      currentImage,
      coverAction,
      deleteAction,
      addAction,
      onImageUploadProgress
    } = this.props

    const hasSlides = images && images.length > 0

    return (
      <Loader
        loading={isLoading}
        progress={uploadProgress}
      >
        {hasSlides &&
          <div className="image-manager text-center">
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
                        className="image-manager-image"
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
                onImageUploadProgress={onImageUploadProgress}
                hasSlides={hasSlides}
                slug={slug}
                currentImage={currentImage}
                coverAction={coverAction}
                deleteAction={deleteAction}
                addAction={addAction}
              />
            }
          </div>
        }

        {!hasSlides && canEdit &&
          <S3Uploader
            onProgress={onImageUploadProgress}
            onFinish={addAction.handleAdd}
            signingUrlQueryParams={{ slug }}>

            <div className="image-manager text-center no-content uploadable">
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
          <div className="image-manager text-center no-content">
            <i className="fa fa-camera-retro camera"></i>
            No photos added
          </div>
        }
      </Loader>
    )
  }
}

ImageManager.propTypes = {
  coverAction: PropTypes.object,
  deleteAction: PropTypes.object,
  addAction: PropTypes.object
}

ImageManager.defaultProps = {
  coverAction: {},
  deleteAction: {},
  addAction: {}
}

export default ImageManager

