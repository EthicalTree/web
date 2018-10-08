import './OpenCloseSelector.css'

import React from 'react'

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Button,
  Input,
} from 'reactstrap'

import { Icon } from '../../Icon'

export const OpenCloseSelector = props => {
  const { setDay, selectedDay, days, addMoreHours, setTime } = props

  const Day = p => {
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
        onClick={() => setDay(p.day)}
      >
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
            {selectedDay && (
              <Card className="ml-3 mr-3 mt-3">
                <CardHeader className="card-header pl-3 pt-2">
                  {selectedDay.label}
                </CardHeader>

                <CardBody>
                  {selectedDay.hours.map((h, i) => {
                    return (
                      <div
                        key={`${selectedDay.day}_${i}`}
                        className="d-flex justify-content-between mb-2"
                      >
                        <Input
                          bsSize="sm"
                          type="time"
                          value={h.openAt24Hour}
                          onChange={e => {
                            h.openAt24Hour = e.target.value
                            setTime(selectedDay.hours)
                          }}
                        />
                        <span className="p-2">to</span>
                        <Input
                          bsSize="sm"
                          type="time"
                          value={h.closedAt24Hour}
                          onChange={e => {
                            h.closedAt24Hour = e.target.value
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
            )}

            {!selectedDay && (
              <Row className="text-center">
                <Col>
                  <p>Click a day above to add hours</p>
                </Col>
              </Row>
            )}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default OpenCloseSelector
