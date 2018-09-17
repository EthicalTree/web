import React from 'react'
import { connect } from 'react-redux'

import { Modal } from '../Modal'
import { OpenCloseSelector } from '../../../components/DateTime/OpenCloseSelector'

import { saveOperatingHours } from '../../../actions/listing'

class EditOperatingHoursModal extends React.Component {
  constructor(props) {
    super(props)

    const { listing } = props
    let operatingHours = listing.operatingHours ? listing.operatingHours : []

    let hours = {
      sunday: { label: 'Sunday', hours: [] },
      monday: { label: 'Monday', hours: [] },
      tuesday: { label: 'Tuesday', hours: [] },
      wednesday: { label: 'Wednesday', hours: [] },
      thursday: { label: 'Thursday', hours: [] },
      friday: { label: 'Friday', hours: [] },
      saturday: { label: 'Saturday', hours: [] },
    }

    if (operatingHours.length > 0) {
      operatingHours.forEach(item => {
        hours[item.day].hours.push(item)
      })
    }

    this.state = {
      selectedDay: null,
      operatingHours: hours,
    }
  }

  submit(e) {
    e.preventDefault()

    const { dispatch, listing } = this.props

    dispatch(saveOperatingHours(listing, this.state.operatingHours))
  }

  setDay(day) {
    this.setState({
      selectedDay: day === this.state.selectedDay ? null : day,
    })
  }

  addMoreHours() {
    const { selectedDay } = this.state
    const day = selectedDay
    let operatingHours = { ...this.state.operatingHours }

    const newHours = {
      openAt24Hour: '08:00',
      closedAt24Hour: '18:00',
    }

    operatingHours[day] = {
      ...operatingHours[day],
      hours: [...operatingHours[day].hours, newHours],
    }

    this.setState({
      operatingHours: { ...operatingHours },
    })
  }

  setTime(hours) {
    const { selectedDay } = this.state
    let operatingHours = { ...this.state.operatingHours }

    operatingHours[selectedDay].hours = hours

    this.setState({ operatingHours })
  }

  render() {
    const { modal } = this.props
    let { selectedDay } = this.state

    selectedDay = selectedDay && {
      day: selectedDay,
      ...this.state.operatingHours[selectedDay],
    }

    return (
      <Modal
        className="edit-operating-hours-modal medium-modal"
        loading={modal.isLoading}
        contentLabel="Edit Hours"
        modalName="edit-operating-hours"
        onSave={this.submit.bind(this)}
      >
        <OpenCloseSelector
          selectedDay={selectedDay}
          days={this.state.operatingHours}
          addMoreHours={this.addMoreHours.bind(this)}
          setTime={this.setTime.bind(this)}
          setDay={this.setDay.bind(this)}
        />
      </Modal>
    )
  }
}

const select = state => {
  return {
    listing: state.listing,
    modal: state.modal,
  }
}

export default connect(select)(EditOperatingHoursModal)
