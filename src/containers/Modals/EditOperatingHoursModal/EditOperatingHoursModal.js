import React from 'react'
import { connect } from 'react-redux'

import { Modal } from '../Modal'
import { DateSelector } from '../../../components/DateTime'

import {
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap'

import { saveOperatingHours } from '../../../actions/listing'
import { localizedDates } from '../../../models/hours'

class EditOperatingHoursModal extends React.Component {

  constructor(props) {
    super(props)

    const { listing } = props
    let operatingHours = listing.operatingHours ? listing.operatingHours : []

    operatingHours = localizedDates(operatingHours)

    let hours = {
      'sunday': { label: 'Sunday', hours: []},
      'monday': { label: 'Monday', hours: []},
      'tuesday': { label: 'Tuesday', hours: []},
      'wednesday': { label: 'Wednesday', hours: []},
      'thursday': { label: 'Thursday', hours: []},
      'friday': { label: 'Friday', hours: []},
      'saturday': { label: 'Saturday', hours: []},
    }

    if (operatingHours.length > 0) {
      operatingHours.forEach(item => {
        hours[item.day].hours.push(item)
      })
    }

    this.state = {
      selectedDay: null,
      operatingHours: hours
    }
  }

  submit(e) {
    e.preventDefault()

    const { dispatch, listing } = this.props

    dispatch(saveOperatingHours(listing.slug, this.state.operatingHours))
  }

  setDay(day) {
    this.setState({
      selectedDay: day === this.state.selectedDay ? null : day
    })
  }

  addMoreHours() {
    const { selectedDay } = this.state
    const day = selectedDay
    let operatingHours = {...this.state.operatingHours}

    const newHours = {
      openStr: '12:00 pm',
      closeStr: '10:00 pm'
    }

    operatingHours[day] = {...operatingHours[day], hours: [...operatingHours[day].hours, newHours]}

    this.setState({
      operatingHours: {...operatingHours}
    })
  }

  setTime(hours) {
    const { selectedDay } = this.state
    let operatingHours = {...this.state.operatingHours}

    operatingHours[selectedDay].hours = hours

    this.setState({ operatingHours })
  }

  render() {
    const { listing, modal } = this.props
    let { selectedDay } = this.state

    selectedDay = selectedDay && {
      day: selectedDay,
      ...this.state.operatingHours[selectedDay]
    }

    return (
      <Modal
        className="edit-operating-hours-modal medium-modal"
        loading={modal.isLoading}
        contentLabel="Edit Hours"
        modalName="edit-operating-hours"
        onSave={this.submit.bind(this)}
      >

        <Container>
          {listing.editOperatingHoursErrors &&
            <Row>
              <Col>
                <Alert color="danger">
                  {listing.editOperatingHoursErrors}
                </Alert>
              </Col>
            </Row>
          }

          <DateSelector
            selectedDay={selectedDay}
            days={this.state.operatingHours}
            addMoreHours={this.addMoreHours.bind(this)}
            setTime={this.setTime.bind(this)}
            setDay={this.setDay.bind(this)}
          />
        </Container>
      </Modal>
    )
  }

}

const select = (state) => {
  return {
    listing: state.listing,
    modal: state.modal
  }
}

export default connect(select)(EditOperatingHoursModal)
