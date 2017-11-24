import './ImageManager.sass'

import React from 'react'
import PropTypes from 'prop-types'

import { UncontrolledTooltip as Tooltip } from 'reactstrap'
import Loader from '../Global/Loader'
import S3Uploader from '../Global/S3'
import ETSlider from './Slider'

const Action = props => {
  const { action, noClick, type, icon, currentImage, locationKey } = props

  const id = `${type}-${locationKey}`
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
    <i
      id={id}
      title={action.title}
      role="button"
      tabIndex="0"
      onClick={onClick}
      className={`icon-button fa ${icon}`}
    >
      <Tooltip placement="bottom" target={id} delay={0}>{action.title}</Tooltip>
    </i>
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
    locationKey
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
          icon="fa-search-plus"
          currentImage={currentImage}
          action={fullScreenAction}
          locationKey={locationKey}
        />

        {canEdit &&
          <span>
            <Action
              type="cover"
              icon="fa-file-picture-o"
              currentImage={currentImage}
              action={coverAction}
              locationKey={locationKey}
            />

            <Action
              type="delete"
              icon="fa-trash"
              currentImage={currentImage}
              action={deleteAction}
              locationKey={locationKey}
            />

            <S3Uploader
              onProgress={props.onImageUploadProgress}
              onFinish={addAction.handleAction}
              signingUrlQueryParams={signingParams}
            >
              <Action
                type="add"
                icon="fa-plus-circle"
                currentImage={currentImage}
                action={addAction}
                locationKey={locationKey}
                noClick={true}
              />
            </S3Uploader>
          </span>
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

    return (
      <Loader
        className={className}
        loading={isLoading}
        progress={uploadProgress}
      >
        {hasSlides &&
          <div className="image-manager text-center">
            {hasSlides &&
              <ETSlider
                afterChange={this.handleSlideChange.bind(this)}
                initialSlide={images.findIndex(i => (i.id === (currentImage ? currentImage.id : -1)))}
                slides={
                  images.map(image => {
                    const url = `${process.env.REACT_APP_S3_URL}/${image.key}`

                    if (renderWithImgTag) {
                      return (
                        <div key={image.key}>
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
                        key={image.key}>
                        <div style={style} />
                      </div>
                    )
                  })
                }
              />
            }

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
  renderWithImgTag: false
}

export default ImageManager

