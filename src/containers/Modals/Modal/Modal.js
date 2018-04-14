import './Modal.css'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'

import {
  Alert,
  Button,
  Container,
  Col,
  Row
} from 'reactstrap'

import { Loader } from '../../../components/Loader'
import { Icon } from '../../../components/Icon'

import { closeModal } from '../../../actions/modal'

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

const ModalCloser = props => {
  const { onClose } = props

  return (
    <div className="modal-close-wrapper">
      <a href="" className="modal-close" onClick={onClose}>
        <Icon iconKey="cross" />
      </a>
    </div>
  )
}

const TopBar = props => {
  const { onClose } = props

  return (
    <div className="top-bar text-left">
      <h5 className="title">{props.title}</h5>
      <ModalCloser onClose={onClose} />
    </div>
  )
}

const BottomBar = props => {
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

class Modal extends React.Component {

  render() {
    const { props } = this

    let {
      children,
      dispatch,
      modalName,
      modal,
      noDecoration,
      style
    } = props

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
            appElement={document.getElementById('root')}
          >
            {noDecoration &&
              <div style={{ height: '100%' }}>
                <ModalCloser onClose={onClose} />
                {props.children}
              </div>
            }

            {!noDecoration &&
              <Loader loading={props.loading}>
                <TopBar
                  onClose={onClose}
                  title={props.contentLabel}
                />

                <div className="modal-body">
                  {isOpen &&
                    <Container>
                      {modal.errors &&
                        <Row>
                          <Col>
                            <Alert color="danger">
                              {modal.errors}
                            </Alert>
                          </Col>
                        </Row>
                      }

                      {children}
                    </Container>
                  }
                </div>

                <BottomBar
                  saveLabel={props.saveLabel}
                  onSave={props.onSave}
                  onClose={onClose}
                />
              </Loader>
            }
          </ReactModal>
        }
      </div>
    )
  }
}

Modal.propTypes = {
  noDecoration: PropTypes.bool,
  contentLabel: PropTypes.string
}

Modal.defaultProps = {
  noDecoration: false,
  contentLabel: ''
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

