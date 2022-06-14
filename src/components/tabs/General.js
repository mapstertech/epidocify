import { useEffect, useState } from 'react'
import { Row, Col, Container, FloatingLabel, Form, Button, Badge } from 'react-bootstrap';
import Repeatable from '../form-elements/Repeatable';

function General({ editDocument, title }) {

    const [newTitle, setNewTitle] = useState(title);
    const [editors, setEditors] = useState([]);
    const [authority, setAuthority] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [availabilities, setAvailabilities] = useState([]);

    const saveDocument = () => {
      editDocument({
        title : newTitle,
        editors : editors,
        authority : authority,
        idNumber : idNumber,
        availabilities : availabilities
      })
    }

    useEffect(() => {
      saveDocument()
    }, [newTitle, editors, authority, idNumber, availabilities])

    return (
      <div>
        <h4>Edit General Information</h4>
        <p>This section contains general information about the document.</p>
        <hr />
        <Form.Group className="mb-3">

          <FloatingLabel label="Document Title" className="mb-3">
            <Form.Control value={newTitle} onChange={(e) => setNewTitle(e.target.value)} type="text" />
            <Badge bg="light" text="dark" className="label-badge">The title you want to give to this document.</Badge>
          </FloatingLabel>

          <Repeatable label="Editor" array={editors} setArray={setEditors} />

          <h5>Publication Information</h5>

          <FloatingLabel label="Authority" className="mb-3">
            <Form.Control value={authority} onChange={(e) => setAuthority(e.target.value)} type="text" />
            <Badge bg="light" text="dark" className="label-badge">The name of the website or main source you're using.</Badge>
          </FloatingLabel>

          <FloatingLabel label="ID Number" className="mb-3">
            <Form.Control value={idNumber} onChange={(e) => setIdNumber(e.target.value)} type="text" />
            <Badge bg="light" text="dark" className="label-badge">The identifying number for this inscription in your source.</Badge>
          </FloatingLabel>

          <Repeatable label="Usage Terms" description="Include information about copyright or usage terms. Include a link to term information in parentheses." array={availabilities} setArray={setAvailabilities} />

        </Form.Group>
      </div>
    );

}

export default General;
