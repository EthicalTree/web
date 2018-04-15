import './ImageManager.css'

import React from 'react'
import PropTypes from 'prop-types'

import { UncontrolledTooltip as Tooltip } from 'reactstrap'
import { Loader } from '../Loader'
import { S3Uploader } from '../S3Uploader'
import { Icon } from '../Icon'
import { Slider } from '../Slider'
import { Repositioner } from './Repositioner'

import { s3Url } from '../../utils/s3'

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
    <span className={`action-${type}`}>
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
    repositionAction,
    signingParams,
  } = props

  const hasActions = (
    !!fullScreenAction.handleAction ||
    !!coverAction.handleAction ||
    !!deleteAction.handleAction ||
    !!addAction.handleAction ||
    !!repositionAction.handleAction
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
              type="reposition"
              icon="reposition"
              currentImage={currentImage}
              action={repositionAction}
            />

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
  repositionAction: PropTypes.object,
  fullScreenAction: PropTypes.object
}

ImageActions.defaultProps = {
  canEdit: false,
  coverAction: {},
  deleteAction: {},
  addAction: {},
  repositionAction: {},
  fullScreenAction: {}
}

class ImageManager extends React.Component {
  state = {
    isRepositioning: false,
    repositionData: null
  }

  handleFinishReposition = () => {
    const { currentImage, handleReposition } = this.props
    const { repositionData } = this.state

    this.setState({
      isRepositioning: false,
      repositionData: null
    })

    handleReposition(currentImage, repositionData)
  }

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
      handleReposition,
      coverAction,
      deleteAction,
      addAction,
      fullScreenAction,
      onImageUploadProgress,
      repositionImages,
      signingParams,
      imgStyle
    } = this.props

    const { isRepositioning, repositionData } = this.state

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
            {!isRepositioning &&
              <ImageActions
                dispatch={dispatch}
                canEdit={canEdit}
                onImageUploadProgress={onImageUploadProgress}
                hasSlides={hasSlides}
                currentImage={currentImage}
                coverAction={coverAction}
                deleteAction={deleteAction}
                addAction={addAction}
                repositionAction={{
                  handleAction: handleReposition && (() => this.setState({ isRepositioning: true })),
                  title: 'Reposition Photo'
                }}
                fullScreenAction={fullScreenAction}
                signingParams={signingParams}
              />
            }

            {hasSlides &&
              <Slider
                afterChange={this.handleSlideChange.bind(this)}
                initialSlide={images.findIndex(i => (i.id === (currentImage ? currentImage.id : -1)))}
                arrows={!isRepositioning}
                slides={
                  displayImages.map((image, i) => {
                    const url = s3Url('ethicaltree', image.key)
                    const key = `${image.key}-${i}`
                    let repositionStyle = {}

                    if (repositionImages) {
                      const offsetY = -image.coverOffsetY || 0
                      const extraOffsetY = repositionData ? repositionData.diffY : 0

                      repositionStyle = {
                        transform: `translateY(${(offsetY - extraOffsetY) / 4}%)`
                      }
                    }

                    return (
                      <div
                        key={key}
                        className="image-manager-image"
                      >
                        <img
                          alt="Listing"
                          src={url}
                          style={{
                            maxWidth: '100%',
                            ...imgStyle,
                            ...repositionStyle
                          }}
                        />
                      </div>
                    )
                  })
                }
              />
            }

            {isRepositioning &&
              <Repositioner
                offset={repositionData}
                handleReposition={data => this.setState({ repositionData: data })}
                handleFinishReposition={this.handleFinishReposition}
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
  handleReposition: PropTypes.func,
  coverAction: PropTypes.object,
  deleteAction: PropTypes.object,
  addAction: PropTypes.object,
  fullScreenAction: PropTypes.object,
  imgStyle: PropTypes.object,
  repositionImages: PropTypes.bool
}

ImageManager.defaultProps = {
  className: '',
  coverAction: {},
  deleteAction: {},
  addAction: {},
  repositionAction: {},
  fullScreenAction: {},
  imgStyle: {},
  images: [],
  repositionImages: false
}

export default ImageManager

