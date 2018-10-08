import React from 'react'
import { connect } from 'react-redux'

import { Modal } from '../Modal'
import { OpenCloseSelector } from '../../../components/DateTime/OpenCloseSelector'

import { saveOperatingHours } from '../../../actions/listing'

class EditOperatingHoursModal extends React.Component {
  addMoreHours = () => {
    let { operatingHours, selectedDay } = this.state
    const day = selectedDay
    operatingHours = { ...operatingHours }

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

  setDay = day => {
    const { selectedDay } = this.state

    this.setState({
      selectedDay: day === selectedDay ? null : day,
    })
  }

  setTime = hours => {
    let { operatingHours, selectedDay } = this.state
    operatingHours = { ...operatingHours }

    operatingHours[selectedDay].hours = hours

    this.setState({ operatingHours })
  }

  submit = e => {
    e.preventDefault()

    const { dispatch, listing } = this.props
    const { operatingHours } = this.state

    dispatch(saveOperatingHours(listing, operatingHours))
  }

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

  render() {
    const { modal } = this.props
    let { selectedDay, operatingHours } = this.state

    selectedDay = selectedDay && {
      day: selectedDay,
      ...operatingHours[selectedDay],
    }

    return (
      <Modal
        className="edit-operating-hours-modal medium-modal"
        loading={modal.isLoading}
        contentLabel="Edit Hours"
        modalName="edit-operating-hours"
        onSave={this.submit}
      >
        <OpenCloseSelector
          selectedDay={selectedDay}
          days={operatingHours}
          addMoreHours={this.addMoreHours}
          setTime={this.setTime}
          setDay={this.setDay}
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
