import './Modal.css'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'

import { Alert, Button, Container, Col, Row } from 'reactstrap'

import { Loader } from '../../../components/Loader'
import { Icon } from '../../../components/Icon'

import { closeModal } from '../../../actions/modal'

const baseStyles = {
  content: {
    position: 'absolute',
    border: '1px solid #ccc',
    background: '#fff',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    padding: '0',
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translateX(-50%)',
  },
  overlay: {},
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
  const saveLabel = props.saveLabel || 'Save'
  const saveDisabled = props.saveDisabled || false
  let saveButton

  if (props.onSave) {
    saveButton = (
      <Button color="primary" onClick={props.onSave} disabled={saveDisabled}>
        {saveLabel}
      </Button>
    )
  }

  return (
    <div className="bottom-bar text-right">
      <Button className="mr-2" color="default" onClick={props.onClose}>
        Cancel
      </Button>

      {saveButton}
    </div>
  )
}

class Modal extends React.Component {
  render() {
    const { props } = this

    let {
      children,
      className,
      dispatch,
      modalName,
      modal,
      noDecoration,
      noContain,
      style,
    } = props

    const isOpen = modal.openModal === modalName

    style = style || {}

    const newStyles = {
      content: {
        ...baseStyles.content,
        ...style.content,
      },
      overlay: {
        ...baseStyles.overlay,
        ...style.overlay,
      },
    }

    const onClose = e => {
      if (e) {
        e.preventDefault()
      }

      dispatch(closeModal())
    }

    const classNames = classnames('et-modal', className, {
      'no-contain': noContain,
    })

    return (
      <div>
        <div className="modal-wrapper" />
        {isOpen && (
          <ReactModal
            shouldCloseOnOverlayClick={false}
            onRequestClose={onClose}
            isOpen={isOpen}
            {...props}
            style={newStyles}
            className={classNames}
            appElement={document.getElementById('root')}
          >
            {noDecoration && (
              <div style={{ height: '100%' }}>
                <ModalCloser onClose={onClose} />
                {props.children}
              </div>
            )}

            {!noDecoration && (
              <Loader loading={props.loading}>
                <TopBar onClose={onClose} title={props.contentLabel} />

                <div className="modal-main">
                  {isOpen && (
                    <Container>
                      {modal.successMessages && (
                        <Row>
                          <Col>
                            <Alert color="success">
                              {modal.successMessages.map(message => (
                                <div key={message}>{message}</div>
                              ))}
                            </Alert>
                          </Col>
                        </Row>
                      )}

                      {modal.infoMessages && (
                        <Row>
                          <Col>
                            <Alert color="primary">
                              {modal.infoMessages.map(message => (
                                <div key={message}>{message}</div>
                              ))}
                            </Alert>
                          </Col>
                        </Row>
                      )}

                      {modal.errors && (
                        <Row>
                          <Col>
                            <Alert color="danger">
                              {modal.errors.map(error => (
                                <div key={error}>{error}</div>
                              ))}
                            </Alert>
                          </Col>
                        </Row>
                      )}

                      {children}
                    </Container>
                  )}
                </div>

                <BottomBar
                  saveLabel={props.saveLabel}
                  saveDisabled={props.saveDisabled}
                  onSave={props.onSave}
                  onClose={onClose}
                />
              </Loader>
            )}
          </ReactModal>
        )}
      </div>
    )
  }
}

Modal.propTypes = {
  noDecoration: PropTypes.bool,
  contentLabel: PropTypes.string,
}

Modal.defaultProps = {
  noDecoration: false,
  contentLabel: '',
}

const select = state => {
  return {
    modal: state.modal,
  }
}

const ConnectedModal = connect(select)(Modal)

const ConfirmModal = props => {
  return (
    <ConnectedModal
      onSave={props.onConfirm}
      saveLabel="Yes"
      noContain
      {...props}
    >
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

export { ConfirmModal }

export default ConnectedModal
