import React from 'react'

const DailyHours = (props) => {
  const { label, hours } = props.hours

  return (
    <div className="daily-hours pt-2 pb-2">
      <p className="day">{label}</p>
      <p className="hours">
        {hours ||
          <span className="closed">
            CLOSED
          </span>
        }
      </p>
    </div>
  )
}

const OperatingHours = (props) => {
  const { dispatch, hours, canEdit } = props
  const hasHours = hours && hours.length > 0

  return (
    <div className="card operating-hours">
      <div className="card-header">
        Operating Hours
      </div>
      <div className="card-body pt-3">
        {canEdit && hasHours &&
          <button
            onClick={() => dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_operating_hours' })}
            className="btn btn-sm btn-default btn-block">
            Edit
          </button>
        }

        {hasHours &&
          <div>
            {hours.map(hours => {
              return (
                <DailyHours key={hours.day} hours={hours} />
              )
            })}
          </div>
        }

        {!hasHours &&
          <div className="daily-hours no-content">
            <p>No operating hours set!</p>
            {canEdit &&
              <button
                onClick={() => dispatch({ type: 'OPEN_MODAL', data: 'edit_listing_operating_hours' })}
                className="btn btn-default btn-block">
                Add
              </button>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default OperatingHours
