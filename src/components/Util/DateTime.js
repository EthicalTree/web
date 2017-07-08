import 'rc-time-picker/assets/index.css'
import './DateTime.sass'

import React from 'react'
import TimePicker from 'rc-time-picker'
import { Toggle }from './Toggle'
import moment from 'moment'

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  ButtonGroup,
  Button
} from 'reactstrap'

export const TimePicker12Hour = (props) => {
  let { defaultValue } = props

  if (defaultValue) {
    defaultValue = moment(defaultValue, 'HH:mm A')
  }

  return (
    <TimePicker
      className="et-timepicker"
      showSecond={false}
      format="h:mm a"
      use12Hours
      allowEmpty={false}
      {...props}
      defaultValue={defaultValue}
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

                <CardBlock>
                  {selectedDay.enabled &&
                    <Row>
                      <Col xs="5">
                        <TimePicker12Hour
                          defaultValue={props.selectedDay.open}
                          onChange={time => props.setTime('open', time)}
                        />
                      </Col>
                      <Col xs="2" className="text-center">
                        to
                      </Col>
                      <Col xs="5">
                        <TimePicker12Hour
                          defaultValue={props.selectedDay.close}
                          onChange={time => props.setTime('close', time)}
                        />
                      </Col>
                    </Row>
                  }

                  {!selectedDay.enabled &&
                    <p className="text-center">Hours have not yet been enabled</p>
                  }
                </CardBlock>
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

