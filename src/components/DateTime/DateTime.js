import './DateTime.css'

import React from 'react'
import moment from 'moment-timezone'

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Button,
  Input
} from 'reactstrap'

import { Icon } from '../Icon'

export const DateSelector = props => {
  const { setDay, selectedDay, days, addMoreHours, setTime } = props

  const Day = (p) => {
    let enabledClass

    const isActive = selectedDay ? selectedDay.day === p.day : false
    const color = isActive ? 'primary' : 'default'
    const activeClass = isActive ? 'active' : ''

    if (days) {
      const day = days[p.day]
      enabledClass = day.hours.length > 0 ? 'enabled' : ''
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
                </CardHeader>

                <CardBody>
                  {selectedDay.hours.map((h, i)=> {
                    return (
                      <div
                        key={`${i}`}
                        className="d-flex justify-content-between mb-2"
                      >
                        <Input
                          bsSize="sm"
                          type="time"
                          value={moment(h.openStr, 'hh:mm a').format('HH:mm')}
                          onChange={e => {
                            h.openStr = moment(e.target.value, 'HH:mm').format('hh:mm a')
                            setTime(selectedDay.hours)
                          }}
                        />
                        <span className="p-2">to</span>
                        <Input
                          bsSize="sm"
                          type="time"
                          value={moment(h.closeStr, 'hh:mm a').format('HH:mm')}
                          onChange={e => {
                            h.closeStr = moment(e.target.value, 'HH:mm').format('hh:mm a')
                            setTime(selectedDay.hours)
                          }}
                        />
                        <Icon
                          iconKey="cross"
                          className="m-2"
                          clickable
                          onClick={() => {
                            let newHours = [...selectedDay.hours]
                            newHours.splice(i, 1)
                            setTime(newHours)
                          }}
                        />
                      </div>
                    )
                  })}

                  <div className="text-center">
                    <a
                      href=""
                      onClick={e => {
                        e.preventDefault()
                        addMoreHours()
                      }}
                    >
                      + Add hours
                    </a>
                  </div>
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

