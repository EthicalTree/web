import React from 'react'
import PropTypes from 'prop-types'
import groupBy from 'lodash/groupBy'

import { OpenClose } from '../../OpenClose'
import { localizedDates } from '../../../models/hours'

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
  render() {
    const { canEdit, dispatch, hours, timezone } = this.props
    const hasHours = hours && hours.length > 0

    const localHours = localizedDates(hours, timezone)
    const groupedHours = groupBy(localHours, h => h.day)

    return (
      <div className="card operating-hours">
        <div className="card-header">Operating Hours</div>

        <div className="mt-4">
          <OpenClose hours={localHours} timezone={timezone} />
        </div>

        <div className="card-body pt-3">
          {canEdit &&
            hasHours && (
              <button
                onClick={() =>
                  dispatch({ type: 'OPEN_MODAL', data: 'edit-operating-hours' })
                }
                className="btn btn-sm btn-default btn-block">
                Edit
              </button>
            )}

          {hasHours && (
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
          )}

          {!hasHours && (
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
                  className="btn btn-default btn-block">
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
  status: PropTypes.oneOf(['opening_soon', 'open', 'closing_soon', 'closed']),
  hours: PropTypes.array,
  canEdit: PropTypes.bool,
}

OperatingHours.defaultProps = {
  status: 'closed',
  hours: [],
  canEdit: false,
}

export default OperatingHours
