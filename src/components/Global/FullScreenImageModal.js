import React from 'react'
import { connect } from 'react-redux'
import ImageManager from '../Global/ImageManager'
import { Modal } from '../Global'

class FullScreenImageModal extends React.Component {
  render() {
    const { dispatch, modal } = this.props

    return (
      <Modal
        className="fullscreen-image-modal"
        modalName="fullscreen_image"
        noDecoration={true}
        style={{
          content: {
            position: 'absolute',
            border: 'none',
            background: 'rgba(0, 0, 0, 0.75)',
            overflow: 'auto',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            height: '100%',
            padding: '20px',
            marginRight: '0',
            transform: 'none'
          },
          overlay: {
          }
        }}
      >
        <ImageManager
          className="full-height d-flex flex-column justify-content-center"
          dispatch={dispatch}
          onSetCurrentImage={image => dispatch({ type: 'SET_FULLSCREEN_MODAL_CURRENT_IMAGE', data: image })}
          images={modal.fullScreenImages}
          currentImage={modal.fullScreenCurrentImage}
          renderWithImgTag={true}
          locationKey="fullscreen-image"
          styleOverrides={url => ({
            height: '100%',
            maxWidth: '100%',
            margin: 'auto'
          })}
          emptyText="No photos added"
          canEdit={false}
        />
      </Modal>
    )
  }

}

const select = (state) => {
  return {
    modal: state.modal
  }
}

export default connect(select)(FullScreenImageModal)
