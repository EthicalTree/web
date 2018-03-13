import './ImageManager.css'

import React from 'react'
import PropTypes from 'prop-types'

import { UncontrolledTooltip as Tooltip } from 'reactstrap'
import { Loader } from '../Loader'
import { S3Uploader } from '../S3Uploader'
import { Icon } from '../Icon'

import ETSlider from './Slider'

const Action = props => {
  const { action, noClick, type, icon, currentImage } = props

  const id = `${type}`
  const tooltipId = `${id}_tooltip`
  let onClick = () => {}

  if (!action.handleAction) {
    return null
  }

  if (!noClick) {
    onClick = e => {
      e.preventDefault()
      action.handleAction(currentImage)
    }
  }

  return (
    <span>
      <Icon
        id={id}
        clickable
        onClick={onClick}
        iconKey={icon}
      />

      <span id={tooltipId} className="tooltip-container">
        <Tooltip
          placement="bottom"
          target={id}
          container={tooltipId}
          delay={0}
        >
          {action.title}
        </Tooltip>
      </span>
    </span>
  )
}

const ImageActions = (props) => {
  const {
    canEdit,
    currentImage,
    coverAction,
    deleteAction,
    addAction,
    fullScreenAction,
    signingParams,
  } = props

  const hasActions = (
    !!fullScreenAction.handleAction ||
    !!coverAction.handleAction ||
    !!deleteAction.handleAction ||
    !!addAction.handleAction
  )

  if (!hasActions) {
    return null
  }

  return (
    <div>
      <div className="actions">
        <div><div className="triangle"></div></div>

        <Action
          type="fullscreen"
          icon="zoom_in"
          currentImage={currentImage}
          action={fullScreenAction}
        />

        {canEdit &&
          <React.Fragment>
            <Action
              type="cover"
              icon="cover_photo"
              currentImage={currentImage}
              action={coverAction}
            />

            <Action
              type="delete"
              icon="trash"
              currentImage={currentImage}
              action={deleteAction}
            />

            <S3Uploader
              accept="image/*"
              onProgress={props.onImageUploadProgress}
              onFinish={addAction.handleAction}
              signingUrlQueryParams={signingParams}
            >
              <Action
                type="add"
                icon="plus"
                currentImage={currentImage}
                action={addAction}
                noClick={true}
              />
            </S3Uploader>
          </React.Fragment>
        }
      </div>
    </div>
  )
}

ImageActions.propTypes = {
  canEdit: PropTypes.bool,
  coverAction: PropTypes.object,
  deleteAction: PropTypes.object,
  addAction: PropTypes.object,
  fullScreenAction: PropTypes.object
}

ImageActions.defaultProps = {
  canEdit: false,
  coverAction: {},
  deleteAction: {},
  addAction: {},
  fullScreenAction: {}
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
      className,
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
      fullScreenAction,
      onImageUploadProgress,
      signingParams,
      styleOverrides,
      renderWithImgTag
    } = this.props

    const hasSlides = images && images.length > 0
    let displayImages

    if (images.length === 1) {
      displayImages = [...images, ...images]
    }
    else {
      displayImages = images
    }

    return (
      <Loader
        className={className}
        loading={isLoading}
        progress={uploadProgress}
      >
        {hasSlides &&
          <div className="image-manager text-center">
            <ImageActions
              dispatch={dispatch}
              canEdit={canEdit}
              onImageUploadProgress={onImageUploadProgress}
              hasSlides={hasSlides}
              currentImage={currentImage}
              coverAction={coverAction}
              deleteAction={deleteAction}
              addAction={addAction}
              fullScreenAction={fullScreenAction}
              signingParams={signingParams}
            />

            {hasSlides &&
              <ETSlider
                afterChange={this.handleSlideChange.bind(this)}
                initialSlide={images.findIndex(i => (i.id === (currentImage ? currentImage.id : -1)))}
                slides={
                  displayImages.map((image, i) => {
                    const url = `${process.env.REACT_APP_S3_URL}/${image.key}`
                    const key = `${image.key}-${i}`

                    if (renderWithImgTag) {
                      return (
                        <div key={key}>
                          <img alt="Listing" style={styleOverrides(url)} src={url} />
                        </div>
                      )
                    }

                    let style = {
                      background: `url('${url}') no-repeat center center`,
                      height: '300px'
                    }

                    style = {...style, ...styleOverrides ? styleOverrides(url) : {}}

                    return (
                      <div
                        className="image-manager-image"
                        key={key}>
                        <div style={style} />
                      </div>
                    )
                  })
                }
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
                <Icon iconKey="camera" className="camera" />
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
  className: PropTypes.string,
  coverAction: PropTypes.object,
  deleteAction: PropTypes.object,
  addAction: PropTypes.object,
  fullScreenAction: PropTypes.object,
  styleOverrides: PropTypes.func,
  renderWithImgTag: PropTypes.bool
}

ImageManager.defaultProps = {
  className: '',
  coverAction: {},
  deleteAction: {},
  addAction: {},
  fullScreenAction: {},
  styleOverrides: null,
  renderWithImgTag: false,
  images: []
}

export default ImageManager

