import './Modal.sass'

import React from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'

import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap'

import Loader from './Loader'

import { closeModal } from '../../actions/modal'

const baseStyles = {
  content: {
    position: 'absolute',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    padding: '0',
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translateX(-50%)'
  },
  overlay: {

  }
}

const TopBar = (props) => {
  return (
    <div className="top-bar text-left mb-4">
      <h5 className="title">{props.title}</h5>

      <div className="modal-close-wrapper">
        <a href="" className="modal-close" onClick={props.onClose}>
          <i className="fa fa-times"></i>
        </a>
      </div>
    </div>
  )
}

const BottomBar = (props) => {
  if (props.onSave) {
    const saveLabel = props.saveLabel || 'Save'

    return (
      <div className="bottom-bar text-right mt-5">
        <Button
          className="mr-2"
          color="default"
          onClick={props.onClose}>
          Cancel
        </Button>

        <Button
          color="primary"
          onClick={props.onSave}>
          {saveLabel}
        </Button>
      </div>
    )
  }

  return <div></div>
}

const Modal = (props) => {

  let { style, modalName, modal, dispatch } = props
  const isOpen = modal.openModal === modalName

  style = style || {}

  const newStyles = {
    content: {
      ...baseStyles.content,
      ...style.content
    },
    overlay: {
      ...baseStyles.overlay,
      ...style.overlay
    }
  }

  const onClose = (e) => {
    if (e) {
      e.preventDefault()
    }

    dispatch(closeModal());
  }

  return (
    <div>
      <div className="modal-wrapper" />
      {isOpen &&
        <ReactModal
          shouldCloseOnOverlayClick={false}
          onRequestClose={onClose}
          isOpen={isOpen}
          {...props}
          style={newStyles}
          className={`et-modal ${props.className}`}
        >

          <Loader loading={props.loading}>
            <TopBar
              onClose={onClose}
              title={props.contentLabel}
            />
            <div className="p-3">
              {isOpen &&
                props.children
              }
            </div>

            <BottomBar
              saveLabel={props.saveLabel}
              onSave={props.onSave}
              onClose={onClose}
            />
          </Loader>
        </ReactModal>
      }
    </div>
  )
}

const select = (state) => {
  return {
    modal: state.modal
  }
}

const ConnectedModal = connect(select)(Modal)

const ConfirmModal = (props) => {
  return (
    <ConnectedModal
      onSave={props.onConfirm}
      saveLabel="Yes"
      {...props}>

      <Container>
        <Row>
          <Col>
            <h5>{props.msg}</h5>
          </Col>
        </Row>
      </Container>
    </ConnectedModal>
  )
}

export {
  ConfirmModal
}

export default ConnectedModal

