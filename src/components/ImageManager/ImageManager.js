import './ImageManager.css'

import React from 'react'
import PropTypes from 'prop-types'

import { Tooltip } from 'reactstrap'
import { Loader } from '../Loader'
import { S3Uploader } from '../S3Uploader'
import { Icon } from '../Icon'
import { Slider } from '../Slider'
import { Repositioner } from './Repositioner'

class Action extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tooltipOpen: false,
    }
  }

  render() {
    const { action, noClick, type, icon } = this.props
    const { tooltipOpen } = this.state
    let onClick = () => {}

    if (!action || !action.handleAction) {
      return null
    }

    if (!noClick) {
      onClick = e => {
        e.preventDefault()
        action.handleAction()
      }
    }

    return (
      <span className={`action-${type}`}>
        <Icon
          clickable
          onClick={onClick}
          onMouseOver={() => this.setState({ tooltipOpen: true })}
          onMouseOut={() => this.setState({ tooltipOpen: false })}
          onFocus={() => this.setState({ tooltipOpen: true })}
          onBlur={() => this.setState({ tooltipOpen: false })}
          iconKey={icon}
          innerRef={target => (this.target = target)}
        />

        <span className="tooltip-container">
          {this.target && (
            <Tooltip
              placement="bottom"
              isOpen={tooltipOpen}
              delay={0}
              target={this.target}
            >
              {action.title}
            </Tooltip>
          )}
        </span>
      </span>
    )
  }
}

const ImageActions = props => {
  const {
    addAction,
    canEdit,
    coverAction,
    deleteAction,
    fullScreenAction,
    repositionAction,
    signingParams,
    shiftPreviousAction,
    shiftNextAction,
  } = props

  const hasActions =
    !!fullScreenAction.handleAction ||
    !!coverAction.handleAction ||
    !!deleteAction.handleAction ||
    !!addAction.handleAction ||
    !!repositionAction.handleAction ||
    !!shiftPreviousAction.handleAction ||
    !!shiftNextAction.handleAction

  if (!hasActions) {
    return null
  }

  return (
    <div>
      <div className="actions">
        <div>
          <div className="triangle" />
        </div>

        {canEdit && (
          <React.Fragment>
            <Action type="cover" icon="cover_photo" action={coverAction} />

            <Action
              type="shift_previous"
              icon="arrow_left"
              action={shiftPreviousAction}
            />

            <Action
              type="shift_next"
              icon="arrow_right"
              action={shiftNextAction}
            />
          </React.Fragment>
        )}

        <Action type="fullscreen" icon="zoom_in" action={fullScreenAction} />

        {canEdit && (
          <React.Fragment>
            <Action
              type="reposition"
              icon="reposition"
              action={repositionAction}
            />

            <Action type="delete" icon="trash" action={deleteAction} />

            <S3Uploader
              accept="image/*"
              onProgress={props.onImageUploadProgress}
              onFinish={addAction.handleAction}
              signingUrlQueryParams={signingParams}
            >
              <Action
                type="add"
                icon="plus"
                action={addAction}
                noClick={true}
              />
            </S3Uploader>
          </React.Fragment>
        )}
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
  fullScreenAction: PropTypes.object,
}

ImageActions.defaultProps = {
  canEdit: false,
  coverAction: {},
  deleteAction: {},
  addAction: {},
  repositionAction: {},
  fullScreenAction: {},
}

class ImageManager extends React.Component {
  state = {
    isRepositioning: false,
    repositionData: null,
  }

  handleFinishReposition = () => {
    const { handleReposition } = this.props
    const { repositionData } = this.state

    this.setState({
      isRepositioning: false,
      repositionData: null,
    })

    handleReposition(repositionData)
  }

  handleSlideChange = index => {
    const { images, onSetCurrentImage } = this.props
    const image = images[index]
    onSetCurrentImage(image)
  }

  componentDidMount() {
    const { images, onSetCurrentImage } = this.props
    if (images.length > 0) onSetCurrentImage(images[0])
  }

  render() {
    const {
      addAction,
      addText,
      canEdit,
      className,
      coverAction,
      currentImage,
      deleteAction,
      emptyText,
      fullScreenAction,
      handleReposition,
      images,
      imgStyle,
      isLoading,
      onImageUploadProgress,
      repositionImages,
      signingParams,
      shiftPreviousAction,
      shiftNextAction,
      uploadProgress,
    } = this.props

    const { isRepositioning, repositionData } = this.state

    const hasSlides = images && images.length > 0
    let displayImages

    if (images.length === 1) {
      displayImages = [...images, ...images]
    } else {
      displayImages = images
    }

    return (
      <Loader
        className={className}
        loading={isLoading}
        progress={uploadProgress}
      >
        {hasSlides && (
          <div className="image-manager text-center">
            {!isRepositioning && (
              <ImageActions
                addAction={addAction}
                canEdit={canEdit}
                coverAction={coverAction}
                deleteAction={deleteAction}
                fullScreenAction={fullScreenAction}
                hasSlides={hasSlides}
                onImageUploadProgress={onImageUploadProgress}
                repositionAction={{
                  handleAction:
                    handleReposition &&
                    (() => this.setState({ isRepositioning: true })),
                  title: 'Reposition current photo',
                }}
                signingParams={signingParams}
                shiftPreviousAction={shiftPreviousAction}
                shiftNextAction={shiftNextAction}
              />
            )}

            {hasSlides && (
              <Slider
                key={displayImages.map(image => image.id).join(',')}
                afterChange={this.handleSlideChange}
                arrows={!isRepositioning}
                initialSlide={currentImage ? currentImage.order : 0}
                slides={displayImages.map((image, i) => {
                  const key = `${image.url}-${i}`
                  let repositionStyle = {}

                  if (repositionImages) {
                    const offsetY = -image.coverOffsetY || 0
                    const extraOffsetY = repositionData
                      ? repositionData.diffY
                      : 0

                    repositionStyle = {
                      transform: `translateY(${(offsetY - extraOffsetY) / 4}%)`,
                    }
                  }

                  return (
                    <div key={key} className="image-manager-image">
                      <img
                        alt="Listing"
                        src={image.url}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          ...imgStyle,
                          ...repositionStyle,
                        }}
                      />
                    </div>
                  )
                })}
              />
            )}

            {isRepositioning && (
              <Repositioner
                offset={repositionData}
                handleReposition={data =>
                  this.setState({ repositionData: data })
                }
                handleFinishReposition={this.handleFinishReposition}
              />
            )}
          </div>
        )}

        {!hasSlides &&
          canEdit && (
            <S3Uploader
              onProgress={onImageUploadProgress}
              onFinish={addAction.handleAction}
              signingUrlQueryParams={signingParams}
            >
              <div className="image-manager text-center no-content uploadable">
                <div className="upload-wrapper">
                  <Icon iconKey="camera" className="camera" />
                  <span className="add-picture-cta">{addText}</span>
                </div>
              </div>
            </S3Uploader>
          )}

        {!hasSlides &&
          !canEdit && (
            <div className="image-manager text-center no-content">
              {emptyText}
            </div>
          )}
      </Loader>
    )
  }
}

ImageManager.propTypes = {
  addAction: PropTypes.object,
  className: PropTypes.string,
  coverAction: PropTypes.object,
  currentImage: PropTypes.object,
  deleteAction: PropTypes.object,
  fullScreenAction: PropTypes.object,
  handleReposition: PropTypes.func,
  imgStyle: PropTypes.object,
  repositionImages: PropTypes.bool,
  shiftPreviousAction: PropTypes.object,
  shiftNextAction: PropTypes.object,
}

ImageManager.defaultProps = {
  className: '',
  coverAction: {},
  currentImage: {},
  deleteAction: {},
  addAction: {},
  repositionAction: {},
  fullScreenAction: {},
  imgStyle: {},
  images: [],
  repositionImages: false,
  shiftPreviousAction: {},
  shiftNextAction: {},
}

export default ImageManager
