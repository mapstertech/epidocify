import { useEffect, useState } from 'react'
import { Tabs, Tab, Container, Form, Badge, Alert, Row, Col, ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import TextHighlighter from '../form-elements/TextHighlighter';
import { getElements, getDefinition } from '../../utils/epidoc-utils'

import { useXMLContext, setDescription, setLayout, setHand } from '../../contexts/XMLContext';

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

            <TextHighlighter
              description="Paste the raw text for the layout description here, then add specific tags to the content below."
              placeholder="Layout Description"
              highlighters={[]}
              secondaryHighlighters={{}}
              setData={(data) => dispatch(setDescription({ layoutData : data}))}
            />

          </Tab>
          <Tab eventKey="hand" title="Hand">

            <TextHighlighter
              description="Paste the raw text for the hand description here, then add specific tags to the content below."
              placeholder="Hand Description"
              highlighters={[
                'height'
              ]}
              secondaryHighlighters={{}}
              setData={(data) => dispatch(setDescription({ handData : data}))}
            />

          </Tab>
        </Tabs>

      </div>
    );

}

export default Description;
