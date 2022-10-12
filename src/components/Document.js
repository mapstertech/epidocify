import { useState, useEffect } from 'react';
import { Row, Col, Tabs, Tab, Form, FloatingLabel, Button, Badge, Nav } from 'react-bootstrap';
import $ from 'jquery';

import XMLContainer from './XMLContainer';
import History from './tabs/History';
import General from './tabs/General';
import Media from './tabs/Media';
import OriginalText from './tabs/OriginalText';
import Translation from './tabs/Translation';
import Bibliography from './tabs/Bibliography';
import Description from './tabs/Description';
import Commentary from './tabs/Commentary';

import { useXMLContext, setGeneral, setOriginalXML } from '../contexts/XMLContext';
import { formatTag } from '../utils/xml-utils';

function Document() {

  const [title, setTitle] = useState('');
  const [file, setFile] = useState(false);
  const { xml : { general }, dispatch } = useXMLContext()

  const createNewDocument = () => {
    dispatch(setGeneral({ title }));
    dispatch(setOriginalXML(`
      <TEI xmlns="http://www.tei-c.org/ns/1.0" xml:id="P42500" xml:lang="en">
        <teiHeader>
          <fileDesc>
            <titleStmt>
            </titleStmt>
            <publicationStmt>
            </publicationStmt>
            <sourceDesc>
               <msDesc>
                  <physDesc>
                     <objectDesc>
                       <supportDesc>
                       </supportDesc>
                       <layoutDesc>
                       </layoutDesc>
                     </objectDesc>
                     <handDesc>
                     </handDesc>
                  </physDesc>
                </msDesc>
            </sourceDesc>
          </fileDesc>
        </teiHeader>
      </TEI>`
    ));
  }

  const setXMLDocument = () => {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(evt.target.result, "text/xml");
      // General
      const title = formatTag($(xmlDoc).find('title').html());
      dispatch(setGeneral({ title }))
      const editors = [];
      $(xmlDoc).find('editor').each(function() { editors.push(formatTag($(this).html())) });
      dispatch(setGeneral({ editors }))
      const authority = formatTag($(xmlDoc).find('authority').html());
      dispatch(setGeneral({ authority }))
      const idNumber = formatTag($(xmlDoc).find('idno[type="filename"]').html());
      dispatch(setGeneral({ idNumber }))
      const availabilities = [];
      $(xmlDoc).find('availability p').each(function() { availabilities.push(
        formatTag($(this).html()).replace(/<ref>/g, '').replace(/<\/ref>/g, '')
      ) });
      dispatch(setGeneral({ availabilities }))
      // Set XML
      dispatch(setOriginalXML(evt.target.result))
    }
  }

  return (
    <Row>
      <Col xs={12}>
        {/*
        <p>Welcome to the Epidoc builder! This is a tool meant to make it easier for you, a scholar, to create epidoc XML documents, without having to deal with all the fuss of learning XML, figuring out syntax, and more -- so you can get back to the ancient world as fast as possible.</p>
        <p>You can make an account to access documents you've already created, or make a new one by entering a title and pressing "Create".</p>
        */}

        {general.title === '' ?
          <div>
            <Form>
              <h3>Create New Document</h3>
              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="documentTitle"
                  label="Document Title"
                  className="mb-3"
                >
                  <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="My Ancient Document" />
                  <Badge bg="light" text="dark" className="label-badge">This can be changed later, don't worry!</Badge>
                </FloatingLabel>
                <Button variant="primary" onClick={() => createNewDocument()}>Create</Button>
              </Form.Group>
            </Form>
            <hr />
            <Form>
              <h3>Upload an XML Document</h3>
              <Row>
                <Col xs={3}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
                  </Form.Group>
                  <Button variant="secondary" onClick={() => setXMLDocument()}>Populate Site</Button>
                </Col>
                <Col xs={9}>
                </Col>
              </Row>
            </Form>
          </div>
        : false}

        {general.title !== '' ?
          <div>
            <h3>{general.title}</h3>
            <hr />
            <Tab.Container defaultActiveKey="general">
              <Row>
                <Col sm={2}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="general">General</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="original-text">Text</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="description">Description</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="history">History</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="translation">Translation</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="commentary">Commentary</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="bibliography">Bibliography</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="media">Media</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <XMLContainer />
                </Col>
                <Col sm={10}>
                  <Tab.Content>
                    <Tab.Pane eventKey="general">
                      <General />
                    </Tab.Pane>
                    <Tab.Pane eventKey="original-text">
                      <OriginalText />
                    </Tab.Pane>
                    <Tab.Pane eventKey="description">
                      <Description />
                    </Tab.Pane>
                    <Tab.Pane eventKey="history">
                      <History />
                    </Tab.Pane>
                    <Tab.Pane eventKey="translation">
                      <Translation />
                    </Tab.Pane>
                    <Tab.Pane eventKey="commentary">
                      <Commentary />
                    </Tab.Pane>
                    <Tab.Pane eventKey="bibliography">
                      <Bibliography />
                    </Tab.Pane>
                    <Tab.Pane eventKey="media">
                      <Media />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        : false}
      </Col>
    </Row>
  )
}

export default Document;
