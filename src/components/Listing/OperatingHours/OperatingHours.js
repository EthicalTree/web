import React from 'react'
import PropTypes from 'prop-types'
import groupBy from 'lodash/groupBy'

import { OpenClose } from '../../OpenClose'
import { DailyHoursSkeleton } from './DailyHoursSkeleton'

import { genDummyList } from '../../../utils/skeleton'

const DAY_LABELS = {
  sunday: 'Sunday',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
}

const DailyHours = props => {
  const { hours, label } = props

  return (
    <div className="daily-hours mt-4">
      <p className="day">{label}</p>

      {hours.map((h, i) => {
        return (
          <p key={`${i}`} className="hours">
            {h.hours}
          </p>
        )
      })}

      {hours.length <= 0 && (
        <p className="hours">
          <span className="closed">CLOSED</span>
        </p>
      )}
    </div>
  )
}

class OperatingHours extends React.PureComponent {
  state = {
    expanded: false,
  }

  render() {
    const { canEdit, dispatch, hours, timezone } = this.props
    const { expanded } = this.state
    const hasHours = hours && hours.length > 0

    const groupedHours = groupBy(hours, h => h.day)

    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ]
    const today = days[new Date().getDay()]

    return (
      <div className="card operating-hours">
        <div className="card-header">Operating Hours</div>

        <div className="mt-4">
          <OpenClose hours={hours} timezone={timezone} />
        </div>

        <div className="card-body pt-3">
          {canEdit &&
            hasHours && (
              <button
                onClick={() =>
                  dispatch({ type: 'OPEN_MODAL', data: 'edit-operating-hours' })
                }
                className="btn btn-sm btn-default btn-block"
              >
                Edit
              </button>
            )}

          {hasHours &&
            expanded && (
              <div>
                <div>
                  {Object.keys(DAY_LABELS).map(day => {
                    return (
                      <DailyHours
                        key={day}
                        hours={groupedHours[day] || []}
                        label={DAY_LABELS[day]}
                      />
                    )
                  })}
                </div>
                <button
                  onClick={() => {
                    this.setState({ expanded: false })
                  }}
                  className="btn btn-sm btn-default btn-block mt-4"
                >
                  See today's hours...
                </button>
              </div>
            )}

          {hasHours &&
            !expanded && (
              <div>
                <div>
                  <DailyHours
                    hours={groupedHours[today] || []}
                    label={'Today'}
                  />
                </div>
                <button
                  onClick={() => {
                    this.setState({ expanded: true })
                  }}
                  className="btn btn-sm btn-default btn-block mt-4"
                >
                  See all hours...
                </button>
              </div>
            )}

          {hours == null &&
            genDummyList(5).map(x => <DailyHoursSkeleton key={x} />)}

          {hours &&
            hours.length < 1 && (
              <div className="daily-hours">
                <p>No operating hours set!</p>
                {canEdit && (
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'OPEN_MODAL',
                        data: 'edit-operating-hours',
                      })
                    }
                    className="btn btn-default btn-block"
                  >
                    Add
                  </button>
                )}
              </div>
            )}
        </div>
      </div>
    )
  }
}

OperatingHours.propTypes = {
  hours: PropTypes.array,
  canEdit: PropTypes.bool,
}

OperatingHours.defaultProps = {
  status: 'closed',
  hours: [],
  canEdit: false,
}

export default OperatingHours
