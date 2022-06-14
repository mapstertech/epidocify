import { useEffect, useState } from 'react'
import { Row, Col, Container, FloatingLabel, Form, Button, Badge } from 'react-bootstrap';

function Repeatable({ label, description, array, setArray }) {

    const setItem = (val, key) => {
      let newArray = JSON.parse(JSON.stringify(array));
      newArray[key] = val;
      setArray(newArray)
    }

    return (
      <div>

          {array.map((item, key) => {
            return (
              <Row>
                <Col xs={11}>
                  <FloatingLabel label={label + " " + (key+1)} className="mb-3">
                    <Form.Control value={item} onChange={(e) => setItem(e.target.value, key)} type="text" />
                    {description ?
                      <Badge bg="light" text="dark" className="label-badge">{description}</Badge> 
                    : false}
                  </FloatingLabel>
                </Col>
                <Col xs={1}>
                  <Button variant="light" size="sm" onClick={() => {
                    let newArray = JSON.parse(JSON.stringify(array));
                    newArray.splice(key, 1);
                    setArray(newArray)
                  }}><i class="bi bi-dash-circle"></i></Button>
                </Col>
              </Row>
            )
          })}

          <div className="mb-4">
            <Button variant="light" size="sm" onClick={() => {
              let newArray = JSON.parse(JSON.stringify(array));
              newArray.push('');
              setArray(newArray)
            }}>Add {label} <i class="bi bi-plus-circle"></i></Button>
          </div>
    </div>
  )
}

export default Repeatable;
