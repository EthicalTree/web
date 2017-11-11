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
    currentImage,
    coverAction,
    deleteAction,
    addAction,
    signingParams
  } = props

  return (
    <div>
      <div className="actions">
        <div><div className="triangle"></div></div>

        {!!coverAction.handleAction &&
          <i
            id={coverAction.title}
            title={coverAction.title}
            role="button"
            tabIndex="0"
            onClick={() => dispatch(setConfirm({
              title: coverAction.title,
              msg: coverAction.confirmMsg,
              action: coverAction.handleAction,
              data: {...coverAction.data, imageId: currentImage.id}
            }))}
            className="icon-button fa fa-file-picture-o"
          >
            <Tooltip placement="bottom" target={coverAction.title} delay={0}>{coverAction.title}</Tooltip>
          </i>
        }

        {!!deleteAction.handleAction &&
          <i
            id={deleteAction.title}
            title={deleteAction.title}
            role="button"
            tabIndex="0"
            onClick={() => dispatch(setConfirm({
              title: deleteAction.title,
              msg: deleteAction.confirmMsg,
              action: deleteAction.handleAction,
              data: {...deleteAction.data, imageId: currentImage.id}
            }))}
            className="icon-button fa fa-trash image-delete"
          >
            <Tooltip placement="bottom" target={deleteAction.title} delay={0}>{deleteAction.title}</Tooltip>
          </i>
        }

        {!!addAction.handleAction &&
          <S3Uploader
            onProgress={props.onImageUploadProgress}
            onFinish={addAction.handleAction}
            signingUrlQueryParams={signingParams}>

            <i
              id={addAction.title}
              title={addAction.title}
              tabIndex="0"
              role="button"
              className="icon-button fa fa-plus-circle" />
            <Tooltip placement="bottom" target={addAction.title} delay={0}>{addAction.title}</Tooltip>

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
    const { onSetCurrentImage } = this.props
    onSetCurrentImage()
  }

  handleSlideChange(index) {
    const { images, onSetCurrentImage } = this.props
    const image = images[index]
    onSetCurrentImage(image)
  }

  render() {
    const {
      images,
      dispatch,
      canEdit,
      addText,
      emptyText,
      isLoading,
      uploadProgress,
      currentImage,
      coverAction,
      deleteAction,
      addAction,
      onImageUploadProgress,
      signingParams,
      styleOverrides
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

                    style = {...style, ...styleOverrides ? styleOverrides(url) : {}}

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
                currentImage={currentImage}
                coverAction={coverAction}
                deleteAction={deleteAction}
                addAction={addAction}
                signingParams={signingParams}
              />
            }
          </div>
        }

        {!hasSlides && canEdit &&
          <S3Uploader
            onProgress={onImageUploadProgress}
            onFinish={addAction.handleAction}
            signingUrlQueryParams={signingParams}>

            <div className="image-manager text-center no-content uploadable">
              <div className="upload-wrapper">
                <i className="fa fa-camera-retro camera"></i>
                <span className="add-picture-cta">
                  {addText}
                </span>
              </div>
            </div>
          </S3Uploader>
        }

        {!hasSlides && !canEdit &&
          <div className="image-manager text-center no-content">
            {emptyText}
          </div>
        }
      </Loader>
    )
  }
}

ImageManager.propTypes = {
  coverAction: PropTypes.object,
  deleteAction: PropTypes.object,
  addAction: PropTypes.object,
  styleOverrides: PropTypes.func
}

ImageManager.defaultProps = {
  coverAction: {},
  deleteAction: {},
  addAction: {},
  styleOverrides: null
}

export default ImageManager

