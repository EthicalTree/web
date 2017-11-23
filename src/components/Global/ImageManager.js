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
    canEdit,
    currentImage,
    coverAction,
    deleteAction,
    addAction,
    fullScreenAction,
    signingParams
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

        {!!fullScreenAction.handleAction &&
          <i
            id={fullScreenAction.title}
            title={fullScreenAction.title}
            role="button"
            tabIndex="0"
            onClick={e => {
              e.preventDefault()
              fullScreenAction.handleAction(currentImage)
            }}
            className="icon-button fa fa-search-plus"
          >
            <Tooltip placement="bottom" target={fullScreenAction.title} delay={0}>{fullScreenAction.title}</Tooltip>
          </i>
        }

        {canEdit &&
          <span>
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

