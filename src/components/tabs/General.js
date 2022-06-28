import { useEffect, useState } from 'react'
import { Row, Col, Container, FloatingLabel, Form, Button, Badge } from 'react-bootstrap';
import Repeatable from '../form-elements/Repeatable';

import { useXMLContext, setGeneral } from '../../contexts/XMLContext';

function General() {
    const { xml : { general }, dispatch } = useXMLContext()

    return (
      <div>
        <h4>Edit General Information</h4>
        <p>This section contains general information about the document.</p>
        <hr />
        <Form.Group className="mb-3">

          <FloatingLabel label="Document Title" className="mb-3">
            <Form.Control value={general.title} onChange={(e) => dispatch(setGeneral({ title : e.target.value}))} type="text" />
            <Badge bg="light" text="dark" className="label-badge">The title you want to give to this document.</Badge>
          </FloatingLabel>

          <Repeatable label="Editor" array={general.editors} setArray={(editors) => dispatch(setGeneral({ editors : editors}))} />

          <h5>Publication Information</h5>

          <FloatingLabel label="Authority" className="mb-3">
            <Form.Control value={general.authority} onChange={(e) => dispatch(setGeneral({ authority : e.target.value}))} type="text" />
            <Badge bg="light" text="dark" className="label-badge">The name of the website or main source you're using.</Badge>
          </FloatingLabel>

          <FloatingLabel label="ID Number" className="mb-3">
            <Form.Control value={general.idNumber} onChange={(e) => dispatch(setGeneral({ idNumber : e.target.value}))} type="text" />
            <Badge bg="light" text="dark" className="label-badge">The identifying number for this inscription in your source.</Badge>
          </FloatingLabel>

          <Repeatable
            label="Usage & Copyright Terms"
            description="Include information about copyright or usage terms. Include a link to term information in parentheses."
            array={general.availabilities}
            setArray={(availabilities) => dispatch(setGeneral({ availabilities : availabilities}))} />

        </Form.Group>
      </div>
    );

}

export default General;
