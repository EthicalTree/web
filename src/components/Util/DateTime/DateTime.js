import 'rc-time-picker/assets/index.css'
import './DateTime.css'

import React from 'react'
import TimePicker from 'rc-time-picker'
import { Toggle }from '../Toggle/Toggle'
import moment from 'moment'

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Button
} from 'reactstrap'

export const TimePicker12Hour = (props) => {
  let { value } = props

  if (value) {
    value = moment(value, 'HH:mm A')
  }

  return (
    <TimePicker
      className="et-timepicker"
      showSecond={false}
      format="h:mm a"
      use12Hours
      allowEmpty={false}
      {...props}
      value={value}
    />
  )
}

export const DateSelector = (props) => {
  const { setDay, selectedDay, days } = props

  const Day = (p) => {
    let enabledClass

    const isActive = selectedDay ? selectedDay.day === p.day : false
    const color = isActive ? 'primary' : 'default'
    const activeClass = isActive ? 'active' : ''

    if (days) {
      const day = days[p.day]
      enabledClass = day && day.enabled ? 'enabled' : ''
    }

    return (
      <Button
        className={`day ${enabledClass} ${activeClass}`}
        color={color}
        onClick={() => setDay(p.day)}>

        {p.day[0].toUpperCase()}
      </Button>
    )
  }

  return (
    <div className="day-picker">
      <Row className="pt-3">
        <Col>
          <div className="text-center">
            <ButtonGroup>
              <Day day="sunday" label="Sunday" />
              <Day day="monday" label="Monday" />
              <Day day="tuesday" label="Tuesday" />
              <Day day="wednesday" label="Wednesday" />
              <Day day="thursday" label="Thursday" />
              <Day day="friday" label="Friday" />
              <Day day="saturday" label="Saturday" />
            </ButtonGroup>
          </div>
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        <Col>
          <Col xs={{ size: 10, offset: 1 }}>

            {selectedDay &&
              <Card className="ml-3 mr-3 mt-3">
                <CardHeader className="card-header pl-3 pt-2">
                  {selectedDay.label}
                  <Toggle
                    checked={selectedDay.enabled || false}
                    onChange={enabled => props.updateDay(selectedDay.day, {enabled})}
                  />
                </CardHeader>

                <CardBody>
                  {selectedDay.enabled &&
                    <Row>
                      <Col xs="12" sm="5">
                        <TimePicker12Hour
                          value={props.selectedDay.openStr}
                          onChange={time => props.setTime('openStr', time)}
                        />
                      </Col>
                      <Col xs="12" sm="2" className="text-center">
                        to
                      </Col>
                      <Col xs="12" sm="5">
                        <TimePicker12Hour
                          value={props.selectedDay.closeStr}
                          onChange={time => props.setTime('closeStr', time)}
                        />
                      </Col>
                    </Row>
                  }

                  {!selectedDay.enabled &&
                    <p className="text-center">Hours have not yet been enabled</p>
                  }
                </CardBody>
              </Card>
            }

            {!selectedDay &&
              <Row className="text-center">
                <Col>
                  <p>Click a day above to add hours</p>
                </Col>
              </Row>
            }


          </Col>
       </Col>
      </Row>
    </div>
  )
}

