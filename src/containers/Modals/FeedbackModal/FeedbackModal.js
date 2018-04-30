import './FeedbackModal.css'

import React from 'react'
import Wufoo from 'react-wufoo-embed'

import { Modal } from '../Modal'

import {
  Row,
} from 'reactstrap'

class FeedbackModal extends React.Component {

  render() {
    return (
      <Modal
        className="feedback-modal medium-modal"
        loading={false}
        contentLabel="Feedback"
        modalName="feedback"
      >
        <Row className="feedback-form">
          <Wufoo
            userName="ethicaltree"
            formHash="ruftm770y2z3yf"
            header="hide"
          />
        </Row>
      </Modal>
    )
  }
}

export default FeedbackModal
