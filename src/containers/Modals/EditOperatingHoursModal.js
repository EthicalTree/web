import React from 'react'
import { connect } from 'react-redux'

import { Modal } from './Modal'
import { DateSelector } from '../../components/Util/DateTime/DateTime'

import {
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap'

import { saveOperatingHours } from '../../actions/listing'

class EditOperatingHoursModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedDay: null,
      operatingHours: null
    }
  }

  componentWillReceiveProps(props) {
    const { listing } = props
    let operatingHours = listing && listing.operatingHours
    let hours = {}

    if (operatingHours && operatingHours.length) {
      operatingHours.forEach(item => {
        hours[item.day] = item
      })
    }
    else {
      hours = {
        'sunday': { label: 'Sunday' },
        'monday': { label: 'Monday' },
        'tuesday': { label: 'Tuesday' },
        'wednesday': { label: 'Wednesday' },
        'thursday': { label: 'Thursday' },
        'friday': { label: 'Friday' },
        'saturday': { label: 'Saturday' },
      }
    }

    this.setState({ operatingHours: hours })
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

  updateDay(day, value) {
    this.setState((prevState) => {
      let operatingHours = {...prevState.operatingHours}
      const selectedDay = operatingHours[day] || {}

      operatingHours[day] = {
        ...selectedDay,
        ...value
      }

      if (value.enabled === true) {
        operatingHours[day].openStr = '12:00 pm'
        operatingHours[day].closeStr = '10:00 pm'
      }

      return {
        ...prevState,
        operatingHours
      }
    })
  }

  setTime(key, time) {
    const { selectedDay } = this.state
    let operatingHours = {...this.state.operatingHours}

    operatingHours[selectedDay][key] = time.format('h:mm a')

    this.setState({ operatingHours })
  }

  render() {
    const { listing } = this.props
    let { selectedDay } = this.state

    selectedDay = selectedDay && {
      day: selectedDay,
      ...this.state.operatingHours[selectedDay]
    }

    return (
      <Modal
        className="edit-operating-hours-modal medium-modal"
        loading={listing.isEditingOperatingHoursLoading}
        contentLabel="Edit Hours"
        modalName="edit_listing_operating_hours"
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
            setTime={this.setTime.bind(this)}
            setDay={this.setDay.bind(this)}
            updateDay={this.updateDay.bind(this)}
          />
        </Container>
      </Modal>
    )
  }

}

const select = (state) => {
  return {
    listing: state.listing
  }
}

export default connect(select)(EditOperatingHoursModal)
