import './Modal.sass'

import React from 'react'
import ReactModal from 'react-modal'

import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap'

import Loader from './Loader'

const baseStyles = {
  content: {
    position: 'absolute',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    padding: '20px',
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

  let { style } = props

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
    e.preventDefault()
    props.onRequestClose()
  }

  return (
    <ReactModal
      shouldCloseOnOverlayClick={false}
      {...props}
      style={newStyles}
      className={`et-modal ${props.className}`}
      >

      <Loader loading={props.loading}>
        <TopBar
          onClose={onClose}
          title={props.contentLabel}
        />

        {props.isOpen &&
          props.children
        }

        <BottomBar
          saveLabel={props.saveLabel}
          onSave={props.onSave}
          onClose={onClose}
        />
      </Loader>
    </ReactModal>
  )
}

const ConfirmModal = (props) => {
  return (
    <Modal
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
    </Modal>
  )
}

export {
  ConfirmModal
}

export default Modal

