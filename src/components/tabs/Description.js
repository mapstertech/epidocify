import { useEffect, useState } from 'react'
import { Tabs, Tab, Container, Form, Badge, Alert, Row, Col, ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import TextHighlighter from '../form-elements/TextHighlighter';
import { getElements, getDefinition } from '../../utils/epidoc-utils'

import { useXMLContext, setDescription } from '../../contexts/XMLContext';

function Description() {
    const { xml : { description }, dispatch } = useXMLContext()

    const [ sourceData, setSourceData ] = useState({});
    const [ layoutDescRaw, setLayoutDescRaw ] = useState('');
    const [ handDescRaw, setHandDescRaw ] = useState('');

    return (
      <div>
        <h4>Edit Source Description</h4>
        <p>Description of the physical object, the layout of the environs, and the inscription hand.</p>

        <Tabs defaultActiveKey="source" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="source" title="Source">

            <TextHighlighter
              description="Paste the raw text for the support description here, then add specific tags to the content below."
              placeholder="Source Description"
              highlighters={[
                "materials",
                "objectType",
                "dimensions"
              ]}
              secondaryHighlighters={{
                'dimensions' : ['height', 'width', 'depth']
              }}
              setData={(data) => dispatch(setDescription({ sourceData : data}))}
            />

          </Tab>
          <Tab eventKey="layout" title="Layout">
            <Form.Control value={layoutDescRaw} as="textarea" rows={4} placeholder="Layout Description" onChange={(e) => setLayoutDescRaw(e.target.value)} />
            <Badge bg="light" text="dark" className="label-badge">Paste the raw text for the layout description here.</Badge>
          </Tab>
          <Tab eventKey="hand" title="Hand">
            <Form.Control value={handDescRaw} as="textarea" rows={4} placeholder="Hand Description" onChange={(e) => setHandDescRaw(e.target.value)} />
            <Badge bg="light" text="dark" className="label-badge">Paste the raw text for the hand description here.</Badge>
          </Tab>
        </Tabs>

      </div>
    );

}

export default Description;
